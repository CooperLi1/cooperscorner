import * as React from 'react';
import Image from 'next/image';
import { Link as LinkIcon } from 'lucide-react';

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
      <span className="project-header-mark" aria-hidden="true" />
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
              {item.type === 'image' && (
                <Image
                  src={item.src}
                  alt={item.alt || (typeof item.description === 'string' ? item.description : `Project media ${i + 1}`)}
                  width={0}
                  height={0}
                  loading={i === 0 ? 'eager' : undefined}
                  fetchPriority={i === 0 ? 'high' : undefined}
                  sizes="(min-width: 84rem) 78rem, 100vw"
                  className={`w-full h-auto object-contain bg-[var(--bg-paper)] ${item.className || ''}`}
                />
              )}

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
