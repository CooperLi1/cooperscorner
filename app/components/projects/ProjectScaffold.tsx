'use client';

import * as React from 'react';
import { Link as LinkIcon } from 'lucide-react';

export type MediaItem =
  | { type: 'image'; src: string; alt?: string; description?: string }
  | { type: 'video'; src: string; description?: string };

export function toEmbed(url: string) {
  return url.includes('watch?v=') ? url.replace('watch?v=', 'embed/') : url;
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
            <img
              src={item.src}
              alt={item.alt || 'project image'}
              className="w-full max-h-[62vh] object-contain bg-black/20"
            />
          )}
          {item.type === 'video' && (
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={toEmbed(item.src)}
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          )}
          {item.description && (
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

