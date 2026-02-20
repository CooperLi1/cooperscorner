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
          {/* slim back link */}
          <div className="pt-2">
            <Link
              href="/"
              prefetch={false}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5
                         hover:bg-white/10 px-3 py-1.5 text-sm font-medium text-yellow-300
                         hover:text-yellow-200 transition"
              aria-label="Back"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </div>

          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
