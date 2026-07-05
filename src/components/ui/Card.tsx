import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ children, className = '', ...rest }: CardProps) {
  return (
    <div
      {...rest}
      className={`rounded-[20px] border border-gold/30 bg-paper shadow-[0_18px_44px_-28px_rgba(59,55,66,0.4)] ${className}`}
    >
      {children}
    </div>
  );
}
