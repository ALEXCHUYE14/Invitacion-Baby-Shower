import { useState } from 'react';
import { useGifts } from '../../hooks/useGifts';
import { EVENT } from '../../config/event.config';
import type { Gift } from '../../types';
import { RevealOnScroll } from '../RevealOnScroll';
import { Spinner } from '../ui/Spinner';
import { GiftCard } from './GiftCard';
import { ReserveGiftModal } from './ReserveGiftModal';

export function GiftList() {
  const { gifts, isLoading, error, reserveGift } = useGifts();
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);

  return (
    <section className="py-[clamp(40px,10vw,64px)]">
      <div className="mx-auto w-full max-w-[560px] px-[clamp(22px,6vw,34px)]">
        <RevealOnScroll className="mb-[34px] text-center">
          <p className="font-sans text-[0.68rem] font-light uppercase tracking-[0.4em] text-inkSoft">Con cariño</p>
          <h2 className="mt-2 font-serif text-[clamp(1.9rem,8vw,2.5rem)] font-medium text-ink">Lista de regalos</h2>
          <div className="mx-auto mt-[18px] h-px w-11 bg-goldSoft" />
        </RevealOnScroll>

        <RevealOnScroll>
          <p className="mx-auto mb-[30px] max-w-[26ch] text-center font-emot text-[clamp(1.15rem,5vw,1.4rem)] italic leading-relaxed text-inkSoft">
            {EVENT.giftsIntro}
          </p>
        </RevealOnScroll>

        {isLoading && (
          <div className="flex justify-center py-8">
            <Spinner size={28} />
          </div>
        )}

        {!isLoading && error && <p className="text-center text-sm text-[#a85a4f]">{error}</p>}

        {!isLoading &&
          !error &&
          gifts.map((gift) => (
            <RevealOnScroll key={gift.id}>
              <GiftCard gift={gift} onReserveClick={setSelectedGift} />
            </RevealOnScroll>
          ))}

        <ReserveGiftModal
          gift={selectedGift}
          onClose={() => setSelectedGift(null)}
          onReserve={reserveGift}
        />
      </div>
    </section>
  );
}
