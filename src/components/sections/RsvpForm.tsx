import { Check } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { EVENT } from '../../config/event.config';
import { useRsvp } from '../../hooks/useRsvp';
import { RevealOnScroll } from '../RevealOnScroll';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { RadioCard } from '../ui/RadioCard';
import { Textarea } from '../ui/Textarea';
import { Toast } from '../ui/Toast';

export function RsvpForm() {
  const { status, errorMessage, submitRsvp } = useRsvp();
  const [fullName, setFullName] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [message, setMessage] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    submitRsvp({ fullName, attending: attending === 'yes', message: message || undefined });
  };

  return (
    <section
      className="bg-cover bg-center py-[clamp(44px,11vw,68px)] pb-[clamp(20px,6vw,34px)]"
      style={{ backgroundImage: `url(${EVENT.rsvpBgImage})` }}
    >
      <div className="mx-auto w-full max-w-[560px] px-[clamp(22px,6vw,34px)]">
        <RevealOnScroll className="mb-[34px] text-center">
          <p className="font-sans text-[0.68rem] font-light uppercase tracking-[0.4em] text-inkSoft">Cuéntanos</p>
          <h2 className="mt-2 font-serif text-[clamp(1.9rem,8vw,2.5rem)] font-medium text-ink">
            Confirma tu asistencia
          </h2>
          <div className="mx-auto mt-[18px] h-px w-11 bg-goldSoft" />
        </RevealOnScroll>

        <RevealOnScroll>
          <Card className="border-gold/30 bg-gradient-to-b from-paper to-paper2 px-[clamp(22px,6vw,30px)] py-[clamp(28px,7vw,40px)]">
            {status === 'success' ? (
              <div className="animate-tick py-3 text-center">
                <div className="mx-auto mb-[18px] flex h-[66px] w-[66px] items-center justify-center rounded-full bg-gradient-to-b from-blush to-[#EAD3C7] text-[#7d5341]">
                  <Check size={30} />
                </div>
                <h3 className="font-serif text-[1.6rem] font-medium text-ink">¡Asistencia confirmada!</h3>
                <p className="mt-2 font-emot text-[1.2rem] italic text-inkSoft">
                  Gracias por acompañarnos en este momento tan especial.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <Input
                    id="fullname"
                    label="Nombre completo"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="Escribe tu nombre y apellido"
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="mb-5">
                  <label className="mb-[9px] block pl-0.5 font-sans text-[0.68rem] uppercase tracking-[0.22em] text-inkSoft">
                    ¿Asistirás?
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    <RadioCard
                      name="attend"
                      value="yes"
                      checked={attending === 'yes'}
                      onChange={() => setAttending('yes')}
                    >
                      ✓ Sí, allí estaré
                    </RadioCard>
                    <RadioCard
                      name="attend"
                      value="no"
                      checked={attending === 'no'}
                      onChange={() => setAttending('no')}
                    >
                      No podré asistir
                    </RadioCard>
                  </div>
                </div>

                <div className="mb-1.5">
                  <Textarea
                    id="message"
                    label="Mensaje para los papis (opcional)"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Déjales unas palabras bonitas…"
                  />
                </div>

                <div className="mt-5">
                  <Button type="submit" isLoading={status === 'submitting'}>
                    {status === 'submitting' ? 'Enviando…' : 'Confirmar asistencia'}
                  </Button>
                </div>

                {status === 'error' && errorMessage && <Toast type="err" message={errorMessage} />}
              </form>
            )}
          </Card>
        </RevealOnScroll>
      </div>
    </section>
  );
}
