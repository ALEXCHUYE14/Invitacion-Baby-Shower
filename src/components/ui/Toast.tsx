type ToastType = 'ok' | 'err';

interface ToastProps {
  message: string;
  type: ToastType;
}

const TYPE_CLASSES: Record<ToastType, string> = {
  ok: 'text-[#5a7d52]',
  err: 'text-[#a85a4f]',
};

export function Toast({ message, type }: ToastProps) {
  if (!message) return null;

  return (
    <p role="status" aria-live="polite" className={`mt-4 text-center text-sm ${TYPE_CLASSES[type]}`}>
      {message}
    </p>
  );
}
