import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ children, className = '', ...rest }: CardProps) {
  return (
    <div
      {...rest}
      className={`rounded-[20px] border border-gold/30 bg-paper/88 shadow-[0_18px_44px_-24px_rgba(0,0,0,0.55)] backdrop-blur-md ${className}`}
    >
      {children}
    </div>
  );
}
