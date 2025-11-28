'use client';

import * as React from 'react';
import Image from 'next/image';
import { Link as LinkIcon } from 'lucide-react';

export type MediaItem =
  | { type: 'image'; src: string; alt?: string; description?: string }
  | {
    type: 'video';
    src: string; // primary src (works alone)
    description?: string;
    poster?: string;
    sources?: { src: string; type?: string }[]; // optional extra encodes
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
    <div className={`flex items-center justify-between gap-4 ${className}`}>
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{title}</h1>
      {moreInfoUrl && (
        <a
          href={moreInfoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 hover:bg-white/15 px-3 py-2 text-sm font-semibold text-sky-200 transition"
        >
          <LinkIcon size={18} />
          More Info
        </a>
      )}
    </div>
  );
}

export function MediaList({ items }: { items: MediaItem[] }) {
  return (
    <div className="p-5 md:p-7 space-y-6">
      {items.map((item, i) => (
        <div key={i} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-md">
          {item.type === 'image' && (
            <Image
              src={item.src}
              alt={item.alt || 'project image'}
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto object-contain bg-black/20"
            />
          )}

          {item.type === 'video' && (
            <>
              {isYouTube(item.src) ? (
                // YouTube → iframe
                <div className="relative w-full max-w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src={toEmbed(item.src)}
                    title="Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              ) : (
                // Local/hosted file → HTML5 <video>
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster={('poster' in item && item.poster) || undefined}
                  className="w-full max-w-full bg-black/20"
                >
                  {/*
                    IMPORTANT: put an *untyped* source FIRST to let browsers sniff.
                    This mirrors your working example and helps with .mov in Chrome when decodable.
                  */}
                  <source src={item.src} />

                  {/* Then include known-good typed sources for broader compatibility */}
                  {('sources' in item && item.sources && item.sources.length > 0)
                    ? item.sources.map((s, idx) => (
                      s.type
                        ? <source key={idx} src={s.src} type={s.type} />
                        : <source key={idx} src={s.src} />
                    ))
                    : (() => {
                      const mime = guessMime(item.src);
                      // if it’s a widely supported mime, add a typed duplicate as a fallback
                      if (mime === 'video/mp4' || mime === 'video/webm') {
                        return <source src={item.src} type={mime} />;
                      }
                      return null;
                    })()}
                  Your browser does not support the video tag.
                </video>
              )}
            </>
          )}

          {'description' in item && item.description && (
            <div className="p-4 md:p-5">
              <p className="text-zinc-100/85">{item.description}</p>
            </div>
          )}
        </div>
      ))}
    </div>
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
    <div className={`rounded-3xl overflow-hidden p-0 ${className}`}>
      <section className={scrollable ? 'h-[calc(100vh-12rem)] overflow-y-auto' : 'overflow-visible'}>
        {children}
      </section>
    </div>
  );
}
