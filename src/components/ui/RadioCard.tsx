import type { InputHTMLAttributes, ReactNode } from 'react';

interface RadioCardProps extends InputHTMLAttributes<HTMLInputElement> {
  children: ReactNode;
}

export function RadioCard({ children, className = '', ...rest }: RadioCardProps) {
  return (
    <label className="relative block">
      <input {...rest} type="radio" className="absolute inset-0 cursor-pointer opacity-0 peer" />
      <span
        className={`flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-inkSoft/25 bg-paper px-2 py-2.5 text-center font-sans text-[0.9rem] text-inkSoft transition-all duration-200 ease-signature peer-checked:border-saiyan peer-checked:bg-white peer-checked:text-ink peer-checked:shadow-[0_0_0_3px_rgba(240,194,75,0.3),0_6px_18px_-6px_rgba(232,121,43,0.55)] peer-focus-visible:shadow-[0_0_0_3px_rgba(240,194,75,0.45)] ${className}`}
      >
        {children}
      </span>
    </label>
  );
}
