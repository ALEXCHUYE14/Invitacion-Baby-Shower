import { ExternalLink, Gift as GiftIcon } from 'lucide-react';
import type { Gift } from '../../types';
import { Button } from '../ui/Button';

interface GiftCardProps {
  gift: Gift;
  onReserveClick: (gift: Gift) => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  esenciales: 'Esenciales',
  ropa: 'Ropa',
  alimentacion: 'Alimentación',
  cuidado: 'Cuidado',
  libre: 'Detalle libre',
};

export function GiftCard({ gift, onReserveClick }: GiftCardProps) {
  const available = gift.total_qty - gift.reserved_qty;
  const isReserved = available <= 0;
  const isLastUnits = available === 1;

  return (
    <div
      className={`mb-3.5 rounded-[18px] border border-gold/25 bg-paper p-5 shadow-[0_14px_34px_-28px_rgba(59,55,66,.4)] transition-all duration-300 ease-signature ${
        isReserved ? 'opacity-55' : 'hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-26px_rgba(59,55,66,.5)]'
      }`}
    >
      <div className="flex items-start gap-4">
        <span className="flex h-[46px] w-[46px] flex-none items-center justify-center rounded-2xl bg-gradient-to-b from-blush to-[#EAD3C7] text-[#8a5c48]">
          <GiftIcon size={22} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-serif text-[1.14rem] font-medium text-ink">{gift.name}</h3>
            {gift.category && CATEGORY_LABELS[gift.category] && (
              <span className="rounded-full bg-paper2 px-2.5 py-0.5 font-sans text-[0.62rem] uppercase tracking-[0.14em] text-inkSoft">
                {CATEGORY_LABELS[gift.category]}
              </span>
            )}
          </div>
          {gift.description && <p className="mt-1 text-[0.84rem] font-light text-inkSoft">{gift.description}</p>}

          <div className="mt-2">
            {isReserved ? (
              <span className="inline-block rounded-full bg-ink/8 px-2.5 py-0.5 font-sans text-[0.68rem] uppercase tracking-[0.14em] text-inkSoft">
                Reservado
              </span>
            ) : isLastUnits ? (
              <span className="inline-block rounded-full bg-gold/15 px-2.5 py-0.5 font-sans text-[0.68rem] uppercase tracking-[0.14em] text-gold">
                Últimas unidades
              </span>
            ) : (
              <span className="inline-block rounded-full bg-[#5a7d52]/10 px-2.5 py-0.5 font-sans text-[0.68rem] uppercase tracking-[0.14em] text-[#5a7d52]">
                Disponible
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
        {gift.store_url && (
          <a
            href={gift.store_url}
            target="_blank"
            rel="noopener"
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-inkSoft/25 px-4 py-2.5 font-sans text-[0.74rem] uppercase tracking-[0.12em] text-inkSoft transition-colors hover:border-gold hover:text-ink"
          >
            <ExternalLink size={14} />
            Ver en tienda
          </a>
        )}
        <Button
          type="button"
          variant={isReserved ? 'paper' : 'gold'}
          disabled={isReserved}
          onClick={() => onReserveClick(gift)}
          className="flex-1 !py-2.5 !text-[0.74rem]"
        >
          {isReserved ? 'Ya reservado' : 'Apartar este regalo'}
        </Button>
      </div>
    </div>
  );
}
