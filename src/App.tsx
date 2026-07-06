import { useEffect, useState } from 'react';
import { AudioToggle } from './components/AudioToggle';
import { SplashScreen } from './components/SplashScreen';
import { BabySection } from './components/sections/BabySection';
import { Countdown } from './components/sections/Countdown';
import { EventDetails } from './components/sections/EventDetails';
import { Footer } from './components/sections/Footer';
import { GiftRsvpSection } from './components/sections/GiftRsvpSection';
import { Hero } from './components/sections/Hero';
import { EVENT } from './config/event.config';
import { useAudioPlayer } from './hooks/useAudioPlayer';

const SPLASH_TRANSITION_MS = 900;

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const audio = useAudioPlayer(EVENT.audioSrc);

  useEffect(() => {
    document.body.style.overflow = showSplash ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [showSplash]);

  const handleEnter = () => {
    setHasEntered(true);
    audio.play();
    window.setTimeout(() => setShowSplash(false), SPLASH_TRANSITION_MS);
  };

  return (
    <>
      {showSplash && <SplashScreen isLeaving={hasEntered} onEnter={handleEnter} />}

      <main
        aria-hidden={!hasEntered}
        className={`transition-opacity duration-[1100ms] ease-signature ${
          hasEntered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Hero />
        <BabySection />
        <EventDetails />
        <Countdown />
        <GiftRsvpSection />
        <Footer />
      </main>

      <AudioToggle isPlaying={audio.isPlaying} isVisible={hasEntered} onToggle={audio.toggle} />
    </>
  );
}
