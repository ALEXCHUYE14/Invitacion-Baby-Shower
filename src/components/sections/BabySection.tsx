import { EVENT } from '../../config/event.config';
import { RevealOnScroll } from '../RevealOnScroll';

export function BabySection() {
  return (
    <section className="py-[clamp(20px,6vw,40px)] pb-[clamp(48px,12vw,72px)] text-center">
      <div className="mx-auto w-full max-w-[560px] px-[clamp(22px,6vw,34px)]">
        <RevealOnScroll className="mx-auto w-[min(74%,300px)]">
          <div className="relative rounded-[190px_190px_22px_22px] bg-gradient-to-b from-paper to-paper2 p-3 shadow-[0_24px_50px_-22px_rgba(59,55,66,.42)]">
            <div
              className="pointer-events-none absolute -inset-x-[8%] -top-[14%] -bottom-[6%] -z-10 blur-[10px]"
              style={{ background: 'radial-gradient(60% 55% at 50% 42%, rgba(216,188,142,.4), transparent 64%)' }}
            />
            <div className="pointer-events-none absolute inset-[5px] rounded-[186px_186px_18px_18px] border border-goldSoft" />
            <img
              src={EVENT.babyImage}
              alt="Nuestro bebé en camino"
              loading="lazy"
              className="aspect-[3/4] w-full rounded-[180px_180px_14px_14px] object-cover"
            />
          </div>
        </RevealOnScroll>
        <RevealOnScroll>
          <p className="mx-auto mt-[34px] max-w-[20ch] font-emot text-[clamp(1.25rem,5.6vw,1.6rem)] italic leading-[1.45] text-ink">
            {EVENT.babyPhrase}
          </p>
        </RevealOnScroll>
        <RevealOnScroll className="mt-[22px] text-[0.7rem] tracking-[0.4em] text-gold">
          ✦ &nbsp;·&nbsp; ✦
        </RevealOnScroll>
      </div>
    </section>
  );
}
