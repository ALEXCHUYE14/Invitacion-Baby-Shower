import { EVENT } from '../../config/event.config';
import { useCountdown } from '../../hooks/useCountdown';
import { RevealOnScroll } from '../RevealOnScroll';

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

interface CountdownBoxProps {
  value: number;
  label: string;
}

function CountdownBox({ value, label }: CountdownBoxProps) {
  return (
    <div className="rounded-2xl border border-saiyan/40 bg-paper/85 px-1.5 py-4 pb-3 shadow-[0_14px_34px_-20px_rgba(0,0,0,.6)] backdrop-blur-sm">
      <div
        key={value}
        className="animate-tick font-serif text-[clamp(1.7rem,8vw,2.3rem)] font-medium leading-none text-ink [font-variant-numeric:tabular-nums]"
      >
        {pad(value)}
      </div>
      <div className="mt-2 font-sans text-[0.6rem] uppercase tracking-[0.2em] text-inkSoft">{label}</div>
    </div>
  );
}

export function Countdown() {
  const { days, hours, minutes, seconds, isDone } = useCountdown(EVENT.date);

  return (
    <section className="py-[clamp(30px,8vw,52px)] pb-[clamp(46px,11vw,66px)] text-center">
      <div className="mx-auto w-full max-w-[560px] px-[clamp(22px,6vw,34px)]">
        <RevealOnScroll className="mb-[34px]">
          <p className="text-crisp font-sans text-[0.68rem] font-light uppercase tracking-[0.4em] text-paper">
            La cuenta regresiva
          </p>
          <h2 className="text-crisp-lg mt-2 font-serif text-[clamp(1.9rem,8vw,2.5rem)] font-medium text-paper">
            Falta muy poco
          </h2>
          <div className="mx-auto mt-[18px] h-px w-11 bg-goldSoft" />
        </RevealOnScroll>

        <RevealOnScroll className="relative">
          <div
            className="pointer-events-none absolute -inset-x-[12%] -top-[30%] -bottom-[20%] -z-10 blur-[8px]"
            style={{ background: 'radial-gradient(70% 70% at 50% 40%, rgba(232,121,43,.3), transparent 66%)' }}
          />
          {isDone ? (
            <p className="text-crisp font-emot text-[1.6rem] font-medium italic text-paper">
              {EVENT.countdownDoneMessage}
            </p>
          ) : (
            <div className="mx-auto grid max-w-[420px] grid-cols-4 gap-2.5">
              <CountdownBox value={days} label="Días" />
              <CountdownBox value={hours} label="Horas" />
              <CountdownBox value={minutes} label="Minutos" />
              <CountdownBox value={seconds} label="Segundos" />
            </div>
          )}
        </RevealOnScroll>

        {!isDone && (
          <RevealOnScroll>
            <p className="text-crisp mt-[26px] font-emot text-[1.15rem] font-medium italic text-saiyan">
              {EVENT.countdownNote}
            </p>
          </RevealOnScroll>
        )}
      </div>
    </section>
  );
}
