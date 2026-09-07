import Link from 'next/link';
import type { ReactNode } from 'react';

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="project-route">
      <a className="skip-link" href="#project-content">Skip to content</a>
      <nav className="project-route-nav" aria-label="Project navigation">
        <Link href="/" prefetch={false} aria-label="Back to home">← back to the collage</Link>
      </nav>
      <div className="project-route-shell">
        <main id="project-content" className="project-route-content">{children}</main>
      </div>
    </div>
  );
}
