import { CalendarDays, Clock, MapPin } from 'lucide-react';
import { EVENT } from '../../config/event.config';
import { RevealOnScroll } from '../RevealOnScroll';
import { Card } from '../ui/Card';

export function EventDetails() {
  return (
    <section className="py-[clamp(40px,10vw,64px)]">
      <div className="mx-auto w-full max-w-[560px] px-[clamp(22px,6vw,34px)]">
        <RevealOnScroll className="mb-[34px] text-center">
          <p className="font-sans text-[0.68rem] font-light uppercase tracking-[0.4em] text-paper [text-shadow:0_2px_10px_rgba(0,0,0,.6)]">
            Los detalles
          </p>
          <h2 className="mt-2 font-serif text-[clamp(1.9rem,8vw,2.5rem)] font-medium text-paper [text-shadow:0_4px_16px_rgba(0,0,0,.65)]">
            El gran día
          </h2>
          <div className="mx-auto mt-[18px] h-px w-11 bg-goldSoft" />
        </RevealOnScroll>

        <RevealOnScroll>
          <Card className="px-[clamp(22px,6vw,30px)] py-[clamp(26px,7vw,38px)]">
            <div className="flex items-start gap-4 border-b border-inkSoft/10 py-4">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-goldSoft bg-gradient-to-b from-paper to-paper2 text-gold">
                <CalendarDays size={19} />
              </span>
              <div>
                <div className="font-sans text-[0.68rem] uppercase tracking-[0.28em] text-inkSoft">Fecha</div>
                <div className="mt-[3px] font-serif text-[1.28rem] leading-tight text-ink">
                  {EVENT.dateLabel}
                  <small className="mt-0.5 block font-sans text-[0.86rem] font-light text-inkSoft">
                    {EVENT.dateYearLabel}
                  </small>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 border-b border-inkSoft/10 py-4">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-goldSoft bg-gradient-to-b from-paper to-paper2 text-gold">
                <Clock size={19} />
              </span>
              <div>
                <div className="font-sans text-[0.68rem] uppercase tracking-[0.28em] text-inkSoft">Hora</div>
                <div className="mt-[3px] font-serif text-[1.28rem] leading-tight text-ink">
                  {EVENT.timeLabel}
                  <small className="mt-0.5 block font-sans text-[0.86rem] font-light text-inkSoft">
                    {EVENT.timeHint}
                  </small>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 py-4">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-goldSoft bg-gradient-to-b from-paper to-paper2 text-gold">
                <MapPin size={19} />
              </span>
              <div>
                <div className="font-sans text-[0.68rem] uppercase tracking-[0.28em] text-inkSoft">Lugar</div>
                <div className="mt-[3px] font-serif text-[1.28rem] leading-tight text-ink">
                  {EVENT.venue}
                  <small className="mt-0.5 block font-sans text-[0.86rem] font-light text-inkSoft">
                    {EVENT.venueHint}
                  </small>
                </div>
              </div>
            </div>

            <a
              href={EVENT.mapsUrl}
              target="_blank"
              rel="noopener"
              className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-full bg-ink px-[22px] py-[15px] font-sans text-[0.76rem] font-medium uppercase tracking-[0.14em] text-paper transition-all duration-300 ease-signature hover:-translate-y-0.5 hover:bg-[#2c2933] active:translate-y-0"
            >
              <MapPin size={17} />
              Ver ubicación en GPS
            </a>
          </Card>
        </RevealOnScroll>
      </div>
    </section>
  );
}
