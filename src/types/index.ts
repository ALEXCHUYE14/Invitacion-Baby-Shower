export interface Gift {
  id: string;
  name: string;
  description: string | null;
  category: string | null;
  image_url: string | null;
  store_url: string | null;
  price_ref: number | null;
  total_qty: number;
  reserved_qty: number;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface GiftReservation {
  id: string;
  gift_id: string;
  guest_name: string;
  guest_phone: string | null;
  qty: number;
  created_at: string;
}

export interface Rsvp {
  id: string;
  full_name: string;
  attending: boolean;
  message: string | null;
  created_at: string;
}

export type ReserveGiftInput = {
  giftId: string;
  guestName: string;
  guestPhone?: string;
  qty: number;
};

export type RsvpInput = {
  fullName: string;
  attending: boolean;
  message?: string;
};

export const RESERVE_GIFT_ERROR_MESSAGES: Record<string, string> = {
  NOMBRE_REQUERIDO: 'Por favor escribe tu nombre completo.',
  CANTIDAD_INVALIDA: 'La cantidad debe ser al menos 1.',
  REGALO_NO_DISPONIBLE: 'Este regalo ya no está disponible.',
  SIN_STOCK: 'Justo se agotaron las unidades disponibles. Elige otro regalo 💛',
};

export const DEFAULT_RESERVE_ERROR_MESSAGE =
  'No pudimos completar tu reserva. Inténtalo de nuevo en unos segundos.';

export const DEFAULT_RSVP_ERROR_MESSAGE =
  'No pudimos enviar tu confirmación. Inténtalo de nuevo en unos segundos.';
