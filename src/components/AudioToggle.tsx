import { Volume2, VolumeX } from 'lucide-react';

interface AudioToggleProps {
  isPlaying: boolean;
  isVisible: boolean;
  onToggle: () => void;
}

export function AudioToggle({ isPlaying, isVisible, onToggle }: AudioToggleProps) {
  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isPlaying ? 'Pausar la música' : 'Reanudar la música'}
      className="fixed bottom-4 right-4 z-[90] flex h-12 w-12 items-center justify-center rounded-full border border-goldSoft bg-paper/85 text-gold shadow-[0_6px_18px_rgba(59,55,66,.16)] backdrop-blur-md transition-transform duration-300 ease-signature hover:scale-[1.06] active:scale-95"
    >
      {isPlaying && (
        <span className="absolute -inset-1 animate-pulse-ring rounded-full border border-goldSoft" aria-hidden="true" />
      )}
      {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
    </button>
  );
}
