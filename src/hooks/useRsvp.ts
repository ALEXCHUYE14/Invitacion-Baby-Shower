import { useCallback, useState } from 'react';
import { supabase } from '../lib/supabase';
import { DEFAULT_RSVP_ERROR_MESSAGE, type RsvpInput } from '../types';

export type RsvpStatus = 'idle' | 'submitting' | 'success' | 'error';

export function useRsvp() {
  const [status, setStatus] = useState<RsvpStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const submitRsvp = useCallback(async (input: RsvpInput) => {
    setStatus('submitting');
    setErrorMessage(null);

    const { error } = await supabase.from('rsvps').insert({
      full_name: input.fullName,
      attending: input.attending,
      message: input.message ?? null,
    });

    if (error) {
      setStatus('error');
      setErrorMessage(DEFAULT_RSVP_ERROR_MESSAGE);
      return;
    }

    setStatus('success');
  }, []);

  return { status, errorMessage, submitRsvp };
}
