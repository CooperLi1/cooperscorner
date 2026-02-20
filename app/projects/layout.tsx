// app/projects/layout.tsx
'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import VertexBackground from '@/app/components/VertexBackground';

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen text-white">
      <VertexBackground />
      <div className="relative z-10 px-4 md:px-8 lg:px-16 py-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* back button */}
          <div className="pt-2">
            <Link
              href="/"
              prefetch={false}
              aria-label="Back to home"
              className="group inline-flex items-center gap-2 rounded-full
                         border border-white/15 bg-white/8 backdrop-blur-md
                         px-4 py-2 text-sm font-semibold text-white/80
                         hover:text-white hover:border-purple-400/60
                         hover:shadow-[0_0_16px_-4px_rgba(167,139,250,0.55)]
                         transition-all duration-300"
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
