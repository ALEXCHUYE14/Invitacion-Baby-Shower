import { forwardRef, type TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, id, className = '', ...rest },
  ref
) {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="mb-[9px] block pl-0.5 font-sans text-[0.68rem] uppercase tracking-[0.22em] text-inkSoft"
        >
          {label}
        </label>
      )}
      <textarea
        {...rest}
        ref={ref}
        id={id}
        className={`min-h-[88px] w-full resize-y rounded-xl border border-inkSoft/30 bg-paper px-4 py-3.5 font-sans text-base leading-relaxed text-ink placeholder:text-[#a49ba6] transition-[border-color,box-shadow] duration-200 ease-signature focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/15 ${className}`}
      />
    </div>
  );
});
