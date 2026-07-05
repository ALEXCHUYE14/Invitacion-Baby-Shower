import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import {
  DEFAULT_RESERVE_ERROR_MESSAGE,
  RESERVE_GIFT_ERROR_MESSAGES,
  type Gift,
  type ReserveGiftInput,
} from '../types';

export function useGifts() {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGifts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const { data, error: fetchError } = await supabase
      .from('gifts')
      .select('*')
      .order('sort_order', { ascending: true });

    if (fetchError) {
      setError('No pudimos cargar la lista de regalos. Intenta recargar la página.');
      setIsLoading(false);
      return;
    }

    setGifts((data ?? []) as Gift[]);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchGifts();
  }, [fetchGifts]);

  const reserveGift = useCallback(async (input: ReserveGiftInput): Promise<Gift> => {
    const { data, error: rpcError } = await supabase.rpc('reservar_regalo', {
      p_gift_id: input.giftId,
      p_guest_name: input.guestName,
      p_guest_phone: input.guestPhone ?? null,
      p_qty: input.qty,
    });

    if (rpcError) {
      const message = RESERVE_GIFT_ERROR_MESSAGES[rpcError.message] ?? DEFAULT_RESERVE_ERROR_MESSAGE;
      throw new Error(message);
    }

    const updatedGift = data as Gift;
    setGifts((prev) => prev.map((gift) => (gift.id === updatedGift.id ? updatedGift : gift)));
    return updatedGift;
  }, []);

  return { gifts, isLoading, error, reserveGift, refetch: fetchGifts };
}
