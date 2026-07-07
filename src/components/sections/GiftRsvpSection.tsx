import { Check } from 'lucide-react';
import { useMemo, useState, type FormEvent } from 'react';
import { EVENT } from '../../config/event.config';
import { useGifts } from '../../hooks/useGifts';
import { useRsvp } from '../../hooks/useRsvp';
import { sendToGoogleSheets } from '../../lib/googleSheets';
import type { Gift } from '../../types';
import { RevealOnScroll } from '../RevealOnScroll';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { RadioCard } from '../ui/RadioCard';
import { Spinner } from '../ui/Spinner';
import { Textarea } from '../ui/Textarea';
import { Toast } from '../ui/Toast';
import { GiftCard } from './GiftCard';

const CATEGORY_GROUPS: { key: string; title: string }[] = [
  { key: 'cuota', title: 'Aporte en efectivo' },
  { key: 'mayores', title: 'Artículos mayores' },
  { key: 'lactancia', title: 'Lactancia e higiene' },
  { key: 'ropa', title: 'Ropa y cuidado' },
  { key: 'entretenimiento', title: 'Estimulación y extras' },
];

type GiftOutcome = 'reserved' | 'failed' | null;

export function GiftRsvpSection() {
  const { gifts, isLoading: giftsLoading, error: giftsError, reserveGift } = useGifts();
  const { status: rsvpStatus, errorMessage: rsvpError, submitRsvp } = useRsvp();

  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [fullName, setFullName] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no' | null>(null);
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [giftOutcome, setGiftOutcome] = useState<GiftOutcome>(null);
  const [isReserving, setIsReserving] = useState(false);

  const groupedGifts = useMemo(
    () =>
      CATEGORY_GROUPS.map((group) => ({
        ...group,
        items: gifts.filter((gift) => gift.category === group.key),
      })).filter((group) => group.items.length > 0),
    [gifts]
  );

  const handleSelectGift = (gift: Gift) => {
    setSelectedGift((prev) => (prev?.id === gift.id ? null : gift));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setFormError(null);

    if (!fullName.trim()) {
      setFormError('Por favor escribe tu nombre completo.');
      return;
    }
    if (!attending) {
      setFormError('Por favor confirma si asistirás.');
      return;
    }

    const rsvpSaved = await submitRsvp({ fullName, attending: attending === 'yes', message: message || undefined });

    let outcome: GiftOutcome = null;
    if (attending === 'yes' && selectedGift) {
      setIsReserving(true);
      try {
        await reserveGift({ giftId: selectedGift.id, guestName: fullName, guestPhone: phone || undefined, qty: 1 });
        outcome = 'reserved';
      } catch {
        outcome = 'failed';
      }
      setGiftOutcome(outcome);
      setIsReserving(false);
    }

    if (rsvpSaved) {
      sendToGoogleSheets({
        fullName,
        attending: attending === 'yes',
        phone: phone || undefined,
        message: message || undefined,
        giftName: selectedGift?.name,
        giftOutcome: outcome ?? '',
      });
    }
  };

  const isSubmitting = rsvpStatus === 'submitting' || isReserving;
  const isDone = rsvpStatus === 'success';

  return (
    <section className="py-[clamp(44px,11vw,68px)] pb-[clamp(20px,6vw,34px)]">
      <div className="mx-auto w-full max-w-[560px] px-[clamp(22px,6vw,34px)]">
        <RevealOnScroll className="mb-[34px] text-center">
          <p className="font-sans text-[0.68rem] font-light uppercase tracking-[0.4em] text-paper [text-shadow:0_2px_10px_rgba(0,0,0,.6)]">
            Cuéntanos
          </p>
          <h2 className="mt-2 font-serif text-[clamp(1.9rem,8vw,2.5rem)] font-medium text-paper [text-shadow:0_4px_16px_rgba(0,0,0,.65)]">
            Confirma tu asistencia
          </h2>
          <div className="mx-auto mt-[18px] h-px w-11 bg-goldSoft" />
        </RevealOnScroll>

        <RevealOnScroll>
          <p className="mx-auto mb-[24px] max-w-[28ch] text-center font-emot text-[clamp(1.1rem,4.6vw,1.3rem)] italic leading-relaxed text-goldSoft [text-shadow:0_2px_10px_rgba(0,0,0,.6)]">
            {EVENT.giftsIntro}
          </p>
        </RevealOnScroll>

        <RevealOnScroll>
          <Card className="border-gold/30 bg-gradient-to-b from-paper/92 to-paper2/85 px-[clamp(22px,6vw,30px)] py-[clamp(28px,7vw,40px)] backdrop-blur-md">
            {isDone ? (
              <div className="animate-tick py-3 text-center">
                <div className="mx-auto mb-[18px] flex h-[66px] w-[66px] items-center justify-center rounded-full bg-gradient-to-b from-saiyan to-saiyanGold text-paper">
                  <Check size={30} />
                </div>
                <h3 className="font-serif text-[1.6rem] font-medium text-ink">¡Asistencia confirmada!</h3>
                <p className="mt-2 font-emot text-[1.2rem] italic text-inkSoft">
                  Gracias por acompañarnos en este momento tan especial.
                </p>
                {giftOutcome === 'reserved' && selectedGift && (
                  <p className="mt-4 font-sans text-[0.8rem] text-[#5a7d52]">
                    Apartaste: <strong>{selectedGift.name}</strong> 💛
                  </p>
                )}
                {giftOutcome === 'failed' && (
                  <p className="mt-4 font-sans text-[0.8rem] text-[#a85a4f]">
                    Justo se ocupó el detalle que elegiste, pero tu asistencia ya quedó confirmada.
                  </p>
                )}
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

                <div className="mb-5">
                  <Input
                    id="phone"
                    label="Teléfono (opcional)"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="999 999 999"
                    autoComplete="tel"
                  />
                </div>

                {attending === 'yes' && (
                  <div className="mb-5">
                    <label className="mb-[9px] block pl-0.5 font-sans text-[0.68rem] uppercase tracking-[0.22em] text-inkSoft">
                      ¿Quieres elegir un detalle para el bebé? (opcional)
                    </label>

                    {giftsLoading && (
                      <div className="flex justify-center py-6">
                        <Spinner size={26} />
                      </div>
                    )}

                    {!giftsLoading && giftsError && <p className="text-center text-sm text-[#a85a4f]">{giftsError}</p>}

                    {!giftsLoading && !giftsError && groupedGifts.length > 0 && (
                      <div className="max-h-[420px] space-y-1 overflow-y-auto rounded-xl border border-inkSoft/15 bg-paper2/40 p-3">
                        {groupedGifts.map((group) => (
                          <details key={group.key} className="group" open={group.key === 'cuota'}>
                            <summary className="cursor-pointer select-none rounded-lg px-2 py-1.5 font-sans text-[0.7rem] uppercase tracking-[0.14em] text-inkSoft hover:text-ink">
                              {group.title} ({group.items.length})
                            </summary>
                            <div className="mb-2 mt-2 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                              {group.items.map((gift) => (
                                <GiftCard
                                  key={gift.id}
                                  gift={gift}
                                  selected={selectedGift?.id === gift.id}
                                  onSelect={handleSelectGift}
                                />
                              ))}
                            </div>
                          </details>
                        ))}
                      </div>
                    )}

                    {selectedGift && (
                      <p className="mt-2.5 text-center font-sans text-[0.74rem] text-inkSoft">
                        Elegiste: <strong className="text-ink">{selectedGift.name}</strong> ·{' '}
                        <button
                          type="button"
                          className="underline underline-offset-2 hover:text-saiyanDeep"
                          onClick={() => setSelectedGift(null)}
                        >
                          quitar
                        </button>
                      </p>
                    )}
                  </div>
                )}

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
                  <Button type="submit" isLoading={isSubmitting}>
                    {isSubmitting ? 'Enviando…' : 'Confirmar asistencia'}
                  </Button>
                </div>

                {formError && <Toast type="err" message={formError} />}
                {!formError && rsvpStatus === 'error' && rsvpError && <Toast type="err" message={rsvpError} />}
              </form>
            )}
          </Card>
        </RevealOnScroll>
      </div>
    </section>
  );
}
