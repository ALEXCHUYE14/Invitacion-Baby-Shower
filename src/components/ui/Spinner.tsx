interface SpinnerProps {
  size?: number;
}

export function Spinner({ size = 20 }: SpinnerProps) {
  return (
    <span
      className="inline-block animate-spin rounded-full border-2 border-paper/40 border-t-paper"
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
}
