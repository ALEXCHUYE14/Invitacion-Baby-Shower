import type { ReactNode } from 'react';

interface ParallaxSectionProps {
  bgImage: string;
  children: ReactNode;
  className?: string;
}

export function ParallaxSection({ bgImage, children, className = '' }: ParallaxSectionProps) {
  return (
    <section
      className={`relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-scroll bg-cover bg-center bg-no-repeat md:bg-fixed ${className}`}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/40" />
      <div className="relative z-[1]">{children}</div>
    </section>
  );
}
