import * as React from 'react';
import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
import { Link as LinkIcon } from 'lucide-react';

/* ---------------------------------------------------------------------------
   Intrinsic image sizing.

   These media lists are plain string paths, so `next/image` has no dimensions
   to work with. Passing width={0} height={0} meant the browser reserved no
   space and every project page reflowed hard as its images arrived (measured
   CLS 0.35-0.46 against a 0.1 "good" threshold).

   This module only ever runs on the server - the project routes are static -
   so the real dimensions can be read straight out of /public at build time.
   No dependency, and nothing to keep in sync by hand.
--------------------------------------------------------------------------- */

type Size = { width: number; height: number };

const sizeCache = new Map<string, Size | null>();

function pngSize(buf: Buffer): Size | null {
  if (buf.length < 24 || buf.readUInt32BE(0) !== 0x89504e47) return null;
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function jpegSize(buf: Buffer): Size | null {
  if (buf.length < 4 || buf.readUInt16BE(0) !== 0xffd8) return null;
  let offset = 2;
  while (offset + 9 < buf.length) {
    if (buf[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    const marker = buf[offset + 1];
    // Padding and standalone markers carry no length field.
    if (marker === 0xff) {
      offset += 1;
      continue;
    }
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      offset += 2;
      continue;
    }
    const length = buf.readUInt16BE(offset + 2);
    const isStartOfFrame =
      (marker >= 0xc0 && marker <= 0xc3) ||
      (marker >= 0xc5 && marker <= 0xc7) ||
      (marker >= 0xc9 && marker <= 0xcb) ||
      (marker >= 0xcd && marker <= 0xcf);
    if (isStartOfFrame) {
      return { height: buf.readUInt16BE(offset + 5), width: buf.readUInt16BE(offset + 7) };
    }
    offset += 2 + length;
  }
  return null;
}

/** Walk ISO base-media boxes (mp4 / mov), invoking cb for each child. */
function eachBox(
  buf: Buffer,
  start: number,
  end: number,
  cb: (type: string, bodyStart: number, bodyEnd: number) => void,
) {
  let offset = start;
  while (offset + 8 <= end) {
    let size = buf.readUInt32BE(offset);
    const type = buf.toString('latin1', offset + 4, offset + 8);
    let header = 8;
    if (size === 1) {
      if (offset + 16 > end) return;
      size = Number(buf.readBigUInt64BE(offset + 8));
      header = 16;
    } else if (size === 0) {
      size = end - offset;
    }
    if (size < header || offset + size > end) return;
    cb(type, offset + header, offset + size);
    offset += size;
  }
}

/**
 * Display dimensions of the first video track, from moov > trak > tkhd.
 * Audio tracks report 0x0 and are skipped. A 90-degree rotation matrix means
 * the stored width/height are swapped relative to how the clip displays, which
 * is the normal case for portrait phone footage.
 */
function videoSize(buf: Buffer): Size | null {
  let result: Size | null = null;
  eachBox(buf, 0, buf.length, (type, moovStart, moovEnd) => {
    if (type !== 'moov' || result) return;
    eachBox(buf, moovStart, moovEnd, (trakType, trakStart, trakEnd) => {
      if (trakType !== 'trak' || result) return;
      eachBox(buf, trakStart, trakEnd, (boxType, tkhdStart) => {
        if (boxType !== 'tkhd' || result) return;
        const version = buf[tkhdStart];
        const matrix = tkhdStart + 4 + (version === 1 ? 32 : 20) + 16;
        const widthAt = matrix + 36;
        if (widthAt + 8 > buf.length) return;
        const w = buf.readUInt32BE(widthAt) / 65536;
        const h = buf.readUInt32BE(widthAt + 4) / 65536;
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

function readImageSize(src: string): Size | null {
  // Only local /public assets can be measured; remote URLs are left alone.
  if (!src.startsWith('/') || src.startsWith('//')) return null;
  const cached = sizeCache.get(src);
  if (cached !== undefined) return cached;

  let size: Size | null = null;
  try {
    const file = path.join(process.cwd(), 'public', decodeURIComponent(src.split('?')[0]));
    const buf = fs.readFileSync(file);
    size = pngSize(buf) ?? jpegSize(buf) ?? videoSize(buf);
  } catch {
    size = null;
  }
  sizeCache.set(src, size);
  return size;
}

export type MediaItem =
  | { type: 'image'; src: string; alt?: string; description?: React.ReactNode; className?: string }
  | {
    type: 'video';
    src: string; // primary src (works alone)
    description?: React.ReactNode;
    poster?: string;
    sources?: { src: string; type?: string }[]; // optional extra encodes
    className?: string;
  };

export function toEmbed(url: string) {
  if (url.includes('watch?v=')) {
    return url.replace('watch?v=', 'embed/');
  }
  if (url.includes('shorts/')) {
    return url.replace('shorts/', 'embed/');
  }
  return url;
}

function isYouTube(url: string) {
  return /(?:youtube\.com|youtu\.be)/i.test(url);
}

function guessMime(src: string) {
  const s = src.split('?')[0].toLowerCase();
  if (s.endsWith('.mp4')) return 'video/mp4';
  if (s.endsWith('.webm')) return 'video/webm';
  if (s.endsWith('.mov')) return 'video/quicktime'; // Safari-friendly, Chrome often says “no”
  if (s.endsWith('.m4v')) return 'video/x-m4v';
  return '';
}

export function ProjectHeader({
  title,
  moreInfoUrl,
  subtitle,
  className = '',
}: {
  title: string;
  moreInfoUrl?: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <header className={`project-header ${className}`}>
      <div className="project-header-copy">
        <h1 className="project-title">{title}</h1>
        {subtitle && (
          <p className="project-subtitle">{subtitle}</p>
        )}
      </div>
      {moreInfoUrl && (
        <a
          href={moreInfoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="paper-button project-header-link"
        >
          <LinkIcon size={18} />
          More Info
        </a>
      )}
    </header>
  );
}

export function MediaList({ items }: { items: MediaItem[] }) {
  return (
    <ol className="project-media-list">
      {items.map((item, i) => (
        <li
          key={`${item.type}-${item.src}-${i}`}
          className="project-media-item"
        >
          <figure className="media-frame">
            <div className="project-media-visual">
              {item.type === 'image' && (() => {
                // Real dimensions give the <img> an aspect-ratio, so the row
                // holds its height before the bytes land. Falls back to a 16:10
                // guess only if the file cannot be read.
                const size = readImageSize(item.src) ?? { width: 1600, height: 1000 };
                return (
                  <Image
                    src={item.src}
                    alt={item.alt || (typeof item.description === 'string' ? item.description : `Project media ${i + 1}`)}
                    width={size.width}
                    height={size.height}
                    loading={i === 0 ? 'eager' : undefined}
                    fetchPriority={i === 0 ? 'high' : undefined}
                    sizes="(min-width: 84rem) 78rem, 100vw"
                    className={`w-full h-auto object-contain bg-[var(--bg-paper)] ${item.className || ''}`}
                  />
                );
              })()}

              {item.type === 'video' && (
                isYouTube(item.src) ? (
                  <div className="project-video-embed">
                    <iframe
                      src={toEmbed(item.src)}
                      title={`Project video ${i + 1}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="project-video-iframe"
                    />
                  </div>
                ) : (
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    // Without these the element paints at the default 300x150
                    // and then jumps to full size once metadata arrives - on a
                    // portrait clip that is a ~2000px lurch.
                    width={readImageSize(item.src)?.width}
                    height={readImageSize(item.src)?.height}
                    poster={('poster' in item && item.poster) || undefined}
                    className={`project-local-video ${item.className || ''}`}
                  >
                    <source src={item.src} />

                    {('sources' in item && item.sources && item.sources.length > 0)
                      ? item.sources.map((source, sourceIndex) => (
                        source.type
                          ? <source key={sourceIndex} src={source.src} type={source.type} />
                          : <source key={sourceIndex} src={source.src} />
                      ))
                      : (() => {
                        const mime = guessMime(item.src);
                        if (mime === 'video/mp4' || mime === 'video/webm') {
                          return <source src={item.src} type={mime} />;
                        }
                        return null;
                      })()}
                    Your browser does not support the video tag.
                  </video>
                )
              )}
            </div>

            {'description' in item && item.description && (
              <figcaption className="project-media-caption">
                <span className="project-media-index" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="media-caption">{item.description}</div>
              </figcaption>
            )}
          </figure>
        </li>
      ))}
    </ol>
  );
}

export function MediaCard({
  children,
  scrollable = false, // default: NO inner scroll
  className = '',
}: {
  children: React.ReactNode;
  scrollable?: boolean;
  className?: string;
}) {
  return (
    <section className={`project-media-card ${className}`}>
      <div className={scrollable ? 'h-[calc(100vh-12rem)] overflow-y-auto' : 'project-media-flow'}>
        {children}
      </div>
    </section>
  );
}
