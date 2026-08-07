/**
 * Writes app/data/media-sizes.json - the intrinsic dimensions of every local
 * media file referenced from source.
 *
 * Why a build step rather than reading files from the component: a dynamic
 * `fs.readFileSync(path.join(process.cwd(), 'public', src))` cannot be resolved
 * statically, so Next's output tracer conservatively bundles ALL of public/
 * into every route's serverless function. With ~500MB of video in public/ that
 * blows past Vercel's 250MB function limit. Emitting a small JSON manifest at
 * build time keeps the dimensions without putting fs anywhere near the bundle.
 *
 * Runs automatically via the `prebuild` npm script, so it stays in sync.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, 'public');
const OUT = path.join(ROOT, 'app', 'data', 'media-sizes.json');
const SCAN_DIRS = ['app'];
const MEDIA_RE = /["'`](\/[^"'`\s]+?\.(?:png|jpg|jpeg|webp|gif|mp4|mov|m4v))["'`]/gi;

/* ---------- format parsers ---------- */

function pngSize(buf) {
  if (buf.length < 24 || buf.readUInt32BE(0) !== 0x89504e47) return null;
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function jpegSize(buf) {
  if (buf.length < 4 || buf.readUInt16BE(0) !== 0xffd8) return null;
  let o = 2;
  while (o + 9 < buf.length) {
    if (buf[o] !== 0xff) { o += 1; continue; }
    const m = buf[o + 1];
    if (m === 0xff) { o += 1; continue; }
    if (m === 0xd8 || m === 0x01 || (m >= 0xd0 && m <= 0xd7)) { o += 2; continue; }
    const len = buf.readUInt16BE(o + 2);
    const isSOF =
      (m >= 0xc0 && m <= 0xc3) || (m >= 0xc5 && m <= 0xc7) ||
      (m >= 0xc9 && m <= 0xcb) || (m >= 0xcd && m <= 0xcf);
    if (isSOF) return { height: buf.readUInt16BE(o + 5), width: buf.readUInt16BE(o + 7) };
    o += 2 + len;
  }
  return null;
}

function eachBox(buf, start, end, cb) {
  let o = start;
  while (o + 8 <= end) {
    let size = buf.readUInt32BE(o);
    const type = buf.toString('latin1', o + 4, o + 8);
    let header = 8;
    if (size === 1) {
      if (o + 16 > end) return;
      size = Number(buf.readBigUInt64BE(o + 8));
      header = 16;
    } else if (size === 0) {
      size = end - o;
    }
    if (size < header || o + size > end) return;
    cb(type, o + header, o + size);
    o += size;
  }
}

/** First video track's display size, honouring a 90-degree rotation matrix. */
function videoSize(buf) {
  let result = null;
  eachBox(buf, 0, buf.length, (t, s, e) => {
    if (t !== 'moov' || result) return;
    eachBox(buf, s, e, (t2, s2, e2) => {
      if (t2 !== 'trak' || result) return;
      eachBox(buf, s2, e2, (t3, s3) => {
        if (t3 !== 'tkhd' || result) return;
        const version = buf[s3];
        const matrix = s3 + 4 + (version === 1 ? 32 : 20) + 16;
        const at = matrix + 36;
        if (at + 8 > buf.length) return;
        const w = buf.readUInt32BE(at) / 65536;
        const h = buf.readUInt32BE(at + 4) / 65536;
        if (w < 1 || h < 1) return;
        const rotated = buf.readInt32BE(matrix) === 0 && buf.readInt32BE(matrix + 16) === 0;
        result = rotated
          ? { width: Math.round(h), height: Math.round(w) }
          : { width: Math.round(w), height: Math.round(h) };
      });
    });
  });
  return result;
}

/* ---------- discovery ---------- */

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(tsx?|jsx?|mdx?)$/.test(entry.name)) out.push(full);
  }
  return out;
}

const referenced = new Set();
for (const dir of SCAN_DIRS) {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) continue;
  for (const file of walk(abs)) {
    const text = fs.readFileSync(file, 'utf8');
    for (const m of text.matchAll(MEDIA_RE)) referenced.add(m[1]);
  }
}

/* ---------- measure (incremental) ---------- */

let previous = {};
try {
  previous = JSON.parse(fs.readFileSync(OUT, 'utf8'));
} catch {
  previous = {};
}

const manifest = {};
let measured = 0;
let reused = 0;
let missing = 0;

for (const src of [...referenced].sort()) {
  const file = path.join(PUBLIC, decodeURIComponent(src.replace(/^\//, '')));
  let stat;
  try {
    stat = fs.statSync(file);
  } catch {
    missing += 1;
    continue;
  }

  const prev = previous[src];
  if (prev && prev.size === stat.size && prev.mtimeMs === stat.mtimeMs) {
    manifest[src] = prev;
    reused += 1;
    continue;
  }

  let dims = null;
  try {
    const buf = fs.readFileSync(file);
    dims = pngSize(buf) ?? jpegSize(buf) ?? videoSize(buf);
  } catch {
    dims = null;
  }
  if (!dims) {
    missing += 1;
    continue;
  }
  manifest[src] = { ...dims, size: stat.size, mtimeMs: stat.mtimeMs };
  measured += 1;
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(manifest, null, 2) + '\n');

console.log(
  `media-sizes: ${Object.keys(manifest).length} entries ` +
    `(${measured} measured, ${reused} cached, ${missing} skipped) -> ${path.relative(ROOT, OUT)}`,
);
