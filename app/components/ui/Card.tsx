import * as React from 'react';

export function Card({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`paper-card ${className}`}>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
