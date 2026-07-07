import { EVENT } from '../../config/event.config';
import { RevealOnScroll } from '../RevealOnScroll';

export function Footer() {
  return (
    <footer className="py-[clamp(40px,10vw,60px)] pb-[clamp(70px,16vw,90px)] text-center">
      <RevealOnScroll>
        <div className="text-crisp-lg font-serif text-[2rem] italic text-saiyan">
          {EVENT.parents.dad[0]} &amp; {EVENT.parents.mom[0]}
        </div>
        <p className="text-crisp mt-2.5 font-emot text-[1.15rem] font-medium italic text-saiyan">
          Con amor, {EVENT.parents.dad} y {EVENT.parents.mom}
        </p>
        <p className="text-crisp mt-[22px] font-sans text-[0.66rem] font-light uppercase tracking-[0.24em] text-paper/80">
          {EVENT.footerNote}
        </p>
      </RevealOnScroll>

      <RevealOnScroll>
        <div className="mx-auto mt-8 w-11 border-t border-goldSoft/30" />
        <p className="text-crisp mt-4 font-sans text-[0.68rem] font-medium text-paper/70">
          Creada por el Ing. Miguel Flores
        </p>
        <p className="text-crisp mt-1 font-sans text-[0.62rem] font-light tracking-[0.02em] text-paper/55">
          📱 Cel: 924996961 &nbsp;|&nbsp; 📄 RUC: 10747214439
        </p>
      </RevealOnScroll>
    </footer>
  );
}
