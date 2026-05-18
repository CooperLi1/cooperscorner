// app/projects/layout.tsx
'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen text-[var(--ink)]">
      <div className="relative z-10 px-4 md:px-8 lg:px-16 py-6 md:py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* back button */}
          <div className="pt-2">
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

          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
