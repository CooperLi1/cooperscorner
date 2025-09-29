'use client';

import * as React from 'react';

export function Card({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white/10 backdrop-blur-xl border border-white/15 ring-1 ring-white/10 rounded-2xl shadow-[0_12px_45px_-12px_rgba(0,0,0,0.6)] ${className}`}>
      {children}
    </div>
  );
}
