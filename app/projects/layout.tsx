// app/projects/layout.tsx
import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="project-route">
      <div className="scroll-trace" aria-hidden="true">
        <span className="scroll-trace-progress" />
      </div>
      {/* Nav sits outside the shell so its frosted plate spans the full
          viewport; the inner wrapper keeps the link on the shell's grid. */}
      <nav className="project-route-nav" aria-label="Project navigation">
        <div className="project-route-nav-inner">
          <Link
            href="/"
            prefetch={false}
            aria-label="Back to home"
            className="project-back-link group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back
          </Link>
        </div>
      </nav>

      <div className="project-route-shell">
        <main className="project-route-content">{children}</main>
      </div>
    </div>
  );
}
