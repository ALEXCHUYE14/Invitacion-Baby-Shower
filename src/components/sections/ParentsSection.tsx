import { EVENT } from '../../config/event.config';
import { RevealOnScroll } from '../RevealOnScroll';

export function ParentsSection() {
  return (
    <section className="py-[clamp(36px,9vw,56px)] text-center">
      <div className="mx-auto w-full max-w-[560px] px-[clamp(22px,6vw,34px)]">
        <RevealOnScroll>
          <p className="mb-[18px] font-sans text-[0.7rem] font-light uppercase tracking-[0.4em] text-paper [text-shadow:0_2px_10px_rgba(0,0,0,.6)]">
            {EVENT.parentsEyebrow}
          </p>
        </RevealOnScroll>

        <RevealOnScroll className="mx-auto w-[min(80%,340px)]">
          <div className="relative rounded-[28px] bg-paper/10 p-[3px]">
            <div
              className="pointer-events-none absolute -inset-[10%] -z-10 animate-aura rounded-[36px] blur-[14px]"
              style={{
                background:
                  'radial-gradient(65% 60% at 30% 25%, rgba(240,194,75,.55), transparent 60%), radial-gradient(65% 60% at 75% 80%, rgba(37,64,107,.55), transparent 62%)',
              }}
            />
            <div className="absolute inset-0 rounded-[28px] border border-goldSoft/70 [box-shadow:inset_0_0_0_1px_rgba(63,94,140,.35)]" />
            <img
              src={EVENT.parentsImage}
              alt="Papá besando con ternura la barriguita de mamá"
              loading="lazy"
              className="aspect-[4/5] w-full rounded-[24px] object-cover object-[58%_38%] shadow-[0_24px_50px_-22px_rgba(0,0,0,.65)]"
            />
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <p className="mx-auto mt-[26px] max-w-[26ch] font-emot text-[clamp(1.15rem,5vw,1.45rem)] italic leading-[1.45] text-goldSoft [text-shadow:0_2px_10px_rgba(0,0,0,.6)]">
            {EVENT.parentsPhrase}
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
