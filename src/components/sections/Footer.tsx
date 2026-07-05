import { EVENT } from '../../config/event.config';
import { RevealOnScroll } from '../RevealOnScroll';

export function Footer() {
  return (
    <footer className="py-[clamp(40px,10vw,60px)] pb-[clamp(70px,16vw,90px)] text-center">
      <RevealOnScroll>
        <div className="font-serif text-[2rem] italic text-gold">
          {EVENT.parents.mom[0]} &amp; {EVENT.parents.dad[0]}
        </div>
        <p className="mt-2.5 font-emot text-[1.15rem] italic text-inkSoft">
          Con amor, {EVENT.parents.mom} y {EVENT.parents.dad}
        </p>
        <p className="mt-[22px] font-sans text-[0.66rem] font-light uppercase tracking-[0.24em] text-[#a49ba6]">
          {EVENT.footerNote}
        </p>
      </RevealOnScroll>
    </footer>
  );
}
