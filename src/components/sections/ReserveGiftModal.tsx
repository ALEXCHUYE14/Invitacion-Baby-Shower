import { useEffect, useState, type FormEvent } from 'react';
import type { Gift, ReserveGiftInput } from '../../types';
import { DEFAULT_RESERVE_ERROR_MESSAGE } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';
import { Toast } from '../ui/Toast';

type ReserveStatus = 'idle' | 'submitting' | 'success' | 'error';

interface ReserveGiftModalProps {
  gift: Gift | null;
  onClose: () => void;
  onReserve: (input: ReserveGiftInput) => Promise<Gift>;
}

export function ReserveGiftModal({ gift, onClose, onReserve }: ReserveGiftModalProps) {
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [qty, setQty] = useState(1);
  const [status, setStatus] = useState<ReserveStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setGuestName('');
    setGuestPhone('');
    setQty(1);
    setStatus('idle');
    setErrorMessage('');
  }, [gift?.id]);

  if (!gift) return null;

  const available = gift.total_qty - gift.reserved_qty;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      await onReserve({ giftId: gift.id, guestName, guestPhone: guestPhone || undefined, qty });
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : DEFAULT_RESERVE_ERROR_MESSAGE);
    }
  };

  return (
    <Modal isOpen={Boolean(gift)} onClose={onClose} title={`Apartar «${gift.name}»`}>
      {status === 'success' ? (
        <div className="py-2 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-blush to-[#EAD3C7] text-[#7d5341]">
            ✓
          </div>
          <h4 className="font-serif text-[1.3rem] text-ink">¡Reservado!</h4>
          <p className="mt-2 font-emot text-[1.05rem] italic text-inkSoft">
            Gracias por consentir a nuestro bebé con tanto cariño.
          </p>
          <Button type="button" variant="ink" onClick={onClose} className="mt-6">
            Cerrar
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="guestName"
            label="Tu nombre completo"
            value={guestName}
            onChange={(event) => setGuestName(event.target.value)}
            placeholder="Escribe tu nombre y apellido"
            autoComplete="name"
            required
          />
          <Input
            id="guestPhone"
            label="Teléfono (opcional)"
            value={guestPhone}
            onChange={(event) => setGuestPhone(event.target.value)}
            placeholder="999 999 999"
            autoComplete="tel"
          />
          <Input
            id="qty"
            type="number"
            label={`Cantidad (disponibles: ${available})`}
            value={qty}
            min={1}
            max={available}
            onChange={(event) => setQty(Number(event.target.value))}
            required
          />

          <Button type="submit" isLoading={status === 'submitting'}>
            {status === 'submitting' ? 'Reservando…' : 'Confirmar reserva'}
          </Button>

          {status === 'error' && <Toast type="err" message={errorMessage} />}
        </form>
      )}
    </Modal>
  );
}
