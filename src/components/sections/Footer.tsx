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

      <RevealOnScroll>
        <div className="mx-auto mt-8 w-11 border-t border-goldSoft/30" />
        <p className="mt-4 font-sans text-[0.68rem] font-medium text-paper/70 [text-shadow:0_1px_8px_rgba(0,0,0,.6)]">
          Creada por el Ing. Miguel Flores
        </p>
        <p className="mt-1 font-sans text-[0.62rem] font-light tracking-[0.02em] text-paper/55 [text-shadow:0_1px_8px_rgba(0,0,0,.6)]">
          📱 Cel: 924996961 &nbsp;|&nbsp; 📄 RUC: 10747214439
        </p>
      </RevealOnScroll>
    </footer>
  );
}
