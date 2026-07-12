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
      <div className="project-route-shell">
        <nav className="project-route-nav" aria-label="Project navigation">
          <Link
            href="/"
            prefetch={false}
            aria-label="Back to home"
            className="project-back-link group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back
          </Link>
        </nav>

        <main className="project-route-content">{children}</main>
      </div>
    </div>
  );
}
