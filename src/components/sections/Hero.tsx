import { EVENT } from '../../config/event.config';
import { RevealOnScroll } from '../RevealOnScroll';

export function Hero() {
  return (
    <header className="relative overflow-hidden py-[clamp(64px,16vw,96px)] pb-[clamp(40px,10vw,60px)] text-center">
      <div
        className="pointer-events-none absolute left-1/2 top-[8%] h-[70%] w-[130%] -translate-x-1/2 blur-[6px]"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 40%, rgba(227,194,180,.35), transparent 62%), radial-gradient(80% 70% at 50% 80%, rgba(174,187,208,.28), transparent 66%)',
        }}
      />
      <div className="relative mx-auto w-full max-w-[560px] px-[clamp(22px,6vw,34px)]">
        <RevealOnScroll>
          <p className="mb-[18px] pl-2 font-sans text-[0.7rem] font-light uppercase tracking-[0.45em] text-inkSoft">
            {EVENT.heroEyebrow}
          </p>
        </RevealOnScroll>
        <RevealOnScroll>
          <h1 className="font-serif text-[clamp(2.9rem,15vw,4.4rem)] font-medium leading-[1.02] text-ink">
            {EVENT.parents.mom}
            <span className="my-[0.06em] block font-emot text-[0.42em] italic font-normal text-gold">&amp;</span>
            {EVENT.parents.dad}
          </h1>
        </RevealOnScroll>
        <RevealOnScroll>
          <p className="mx-auto mt-[22px] max-w-[22ch] font-emot text-[clamp(1.2rem,5.4vw,1.55rem)] italic text-inkSoft">
            {EVENT.heroLine}
          </p>
        </RevealOnScroll>
      </div>
    </header>
  );
}
