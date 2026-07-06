import { Gift as GiftIcon } from 'lucide-react';
import { GIFT_IMAGES } from '../../lib/giftImages';
import type { Gift } from '../../types';

interface GiftCardProps {
  gift: Gift;
  selected: boolean;
  onSelect: (gift: Gift) => void;
}

const CATEGORY_STYLES: Record<string, { label: string; className: string }> = {
  cuota: { label: 'Aporte', className: 'bg-kiBlue/10 text-kiBlue' },
  mayores: { label: 'Infraestructura', className: 'bg-saiyan/12 text-saiyanDeep' },
  lactancia: { label: 'Lactancia', className: 'bg-gold/15 text-gold' },
  ropa: { label: 'Ropa y cuidado', className: 'bg-blush/40 text-[#8a5c48]' },
  entretenimiento: { label: 'Estimulación', className: 'bg-kiBlueSoft/15 text-kiBlueSoft' },
};

export function GiftCard({ gift, selected, onSelect }: GiftCardProps) {
  const available = gift.total_qty - gift.reserved_qty;
  const isReserved = available <= 0;
  const category = gift.category ? CATEGORY_STYLES[gift.category] : null;
  const imageSrc = gift.image_url ? GIFT_IMAGES[gift.image_url] : undefined;

  return (
    <label className={`relative block ${isReserved ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
      <input
        type="radio"
        name="selectedGift"
        className="peer absolute inset-0 opacity-0"
        checked={selected}
        disabled={isReserved}
        onChange={() => onSelect(gift)}
      />
      <div
        className={`flex h-full flex-col gap-2.5 rounded-[16px] border border-inkSoft/20 bg-paper p-3.5 text-center shadow-[0_10px_26px_-22px_rgba(59,55,66,.5)] transition-all duration-300 ease-signature peer-checked:border-saiyan peer-checked:shadow-[0_0_0_3px_rgba(240,194,75,0.3),0_10px_24px_-12px_rgba(232,121,43,0.5)] ${
          isReserved ? 'opacity-45' : 'hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-18px_rgba(59,55,66,.45)]'
        }`}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={gift.name}
            loading="lazy"
            className="aspect-square w-full rounded-xl object-cover"
          />
        ) : (
          <span className="mx-auto flex aspect-square w-full items-center justify-center rounded-xl bg-gradient-to-b from-saiyan/20 to-saiyanGold/25 text-saiyanDeep">
            <GiftIcon size={26} />
          </span>
        )}

        <h3 className="font-serif text-[0.92rem] font-medium leading-snug text-ink">{gift.name}</h3>

        {gift.description && <p className="text-[0.72rem] font-light leading-snug text-inkSoft">{gift.description}</p>}

        {category && (
          <span
            className={`mx-auto inline-block rounded-full px-2 py-0.5 font-sans text-[0.6rem] uppercase tracking-[0.1em] ${category.className}`}
          >
            {category.label}
          </span>
        )}

        <span
          className={`mt-auto inline-block rounded-full px-2.5 py-1 font-sans text-[0.64rem] uppercase tracking-[0.12em] ${
            isReserved
              ? 'bg-ink/8 text-inkSoft'
              : selected
                ? 'bg-saiyan text-paper'
                : 'bg-[#5a7d52]/10 text-[#5a7d52]'
          }`}
        >
          {isReserved ? 'Reservado' : selected ? 'Elegido' : 'Disponible'}
        </span>
      </div>
    </label>
  );
}
