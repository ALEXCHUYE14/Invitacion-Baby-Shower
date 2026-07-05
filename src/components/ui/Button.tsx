import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Spinner } from './Spinner';

type ButtonVariant = 'gold' | 'ink' | 'paper';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  children: ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  gold: 'bg-gold text-paper hover:bg-[#a6844f]',
  ink: 'bg-ink text-paper hover:bg-[#2c2933]',
  paper: 'bg-paper text-ink shadow-[0_10px_30px_rgba(59,55,66,0.28)] hover:bg-white',
};

export function Button({
  variant = 'gold',
  isLoading = false,
  disabled,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={disabled || isLoading}
      className={`inline-flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-4 font-sans text-[0.82rem] font-medium uppercase tracking-[0.16em] transition-transform duration-300 ease-signature disabled:cursor-not-allowed disabled:opacity-75 ${
        !disabled && !isLoading ? 'hover:-translate-y-0.5 active:translate-y-0' : ''
      } ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {isLoading && <Spinner size={16} />}
      <span>{children}</span>
    </button>
  );
}
