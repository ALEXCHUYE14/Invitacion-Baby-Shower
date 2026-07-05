import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.error(
    'Faltan las variables de entorno VITE_SUPABASE_URL y/o VITE_SUPABASE_ANON_KEY. La invitación se mostrará, pero la lista de regalos y el RSVP no funcionarán hasta que las configures (ver .env.example).'
  );
}

// Se usa un valor de reserva sintácticamente válido cuando faltan las variables,
// para que la app siga renderizando en vez de romperse por completo al cargar los módulos.
export const supabase = createClient(
  supabaseUrl || 'https://missing-config.supabase.co',
  supabaseAnonKey || 'missing-anon-key'
);
