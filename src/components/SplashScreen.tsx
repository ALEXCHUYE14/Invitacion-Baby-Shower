import { EVENT } from '../config/event.config';

interface SplashScreenProps {
  isLeaving: boolean;
  onEnter: () => void;
}

export function SplashScreen({ isLeaving, onEnter }: SplashScreenProps) {
  return (
    <section
      className={`fixed inset-0 z-[100] flex min-h-dvh flex-col items-center justify-center bg-cover bg-center p-8 text-center transition-all duration-[900ms] ease-signature ${
        isLeaving ? 'pointer-events-none -translate-y-[4%] scale-[1.01] opacity-0' : ''
      }`}
      style={{ backgroundImage: `url(${EVENT.bgImage})` }}
      aria-hidden={isLeaving}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 70% at 50% 42%, rgba(250,246,240,.55), transparent 65%), linear-gradient(180deg, rgba(255,255,255,.05) 0%, rgba(255,255,255,.22) 45%, rgba(255,255,255,.05) 100%)',
        }}
      />

      <div className="relative z-[1] max-w-[440px] text-ink">
        <p className="mb-[22px] pl-2 font-sans text-[0.72rem] font-light uppercase tracking-[0.5em] [text-shadow:0_1px_14px_rgba(255,255,255,.85)]">
          {EVENT.welcomeEyebrow}
        </p>
        <h1 className="font-serif text-[clamp(2.6rem,12vw,3.9rem)] font-medium leading-[1.04] [text-shadow:0_2px_20px_rgba(255,255,255,.9)]">
          {EVENT.celebration}
        </h1>
        <p className="mt-5 font-emot text-[clamp(1.15rem,5vw,1.4rem)] italic [text-shadow:0_1px_14px_rgba(255,255,255,.9)]">
          {EVENT.parents.mom} <span className="font-emot italic text-gold">&amp;</span> {EVENT.parents.dad}
        </p>
        <div className="mx-auto my-[26px] text-[0.7rem] tracking-[0.4em] text-gold">✦ &nbsp;·&nbsp; ✦</div>

        <button
          type="button"
          onClick={onEnter}
          aria-label="Abrir la invitación y reproducir música"
          className="mt-3 inline-flex items-center gap-3 rounded-full bg-paper px-[34px] py-4 font-sans text-[0.78rem] uppercase tracking-[0.22em] text-ink shadow-[0_10px_30px_rgba(59,55,66,.28)] transition-all duration-[350ms] ease-signature hover:-translate-y-[3px] hover:bg-white hover:shadow-[0_16px_38px_rgba(59,55,66,.34)] hover:animate-aura active:translate-y-0"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-saiyan to-saiyanGold" />
          Abrir invitación
        </button>
        <p className="mt-5 text-[0.68rem] uppercase tracking-[0.15em] text-inkSoft [text-shadow:0_1px_10px_rgba(255,255,255,.85)]">
          {EVENT.welcomeHint}
        </p>
      </div>
    </section>
  );
}
