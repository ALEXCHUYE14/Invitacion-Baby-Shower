import type { HTMLAttributes, ReactNode } from 'react';
import { useReveal } from '../hooks/useReveal';

interface RevealOnScrollProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function RevealOnScroll({ children, className = '', ...rest }: RevealOnScrollProps) {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-signature ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[26px] opacity-0'
      } ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
