import { EVENT } from '../../config/event.config';
import { RevealOnScroll } from '../RevealOnScroll';

export function Footer() {
  return (
    <footer className="py-[clamp(40px,10vw,60px)] pb-[clamp(70px,16vw,90px)] text-center">
      <RevealOnScroll>
        <div className="font-serif text-[2rem] italic text-saiyanGold [text-shadow:0_2px_12px_rgba(0,0,0,.6)]">
          {EVENT.parents.mom[0]} &amp; {EVENT.parents.dad[0]}
        </div>
        <p className="mt-2.5 font-emot text-[1.15rem] italic text-goldSoft [text-shadow:0_2px_10px_rgba(0,0,0,.6)]">
          Con amor, {EVENT.parents.mom} y {EVENT.parents.dad}
        </p>
        <p className="mt-[22px] font-sans text-[0.66rem] font-light uppercase tracking-[0.24em] text-paper/80 [text-shadow:0_1px_8px_rgba(0,0,0,.6)]">
          {EVENT.footerNote}
        </p>
      </RevealOnScroll>
    </footer>
  );
}
