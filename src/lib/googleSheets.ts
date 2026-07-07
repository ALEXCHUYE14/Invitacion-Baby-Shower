const webhookUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;

export interface GoogleSheetsRow {
  fullName: string;
  attending: boolean;
  phone?: string;
  message?: string;
  giftName?: string;
  giftOutcome?: 'reserved' | 'failed' | '';
}

/**
 * Envío best-effort a un Google Apps Script Web App (ver README para el
 * script y los pasos de despliegue). Nunca debe bloquear ni romper el
 * flujo de RSVP/reserva de regalo, que ya quedó confirmado en Supabase:
 * cualquier fallo de red o de configuración se registra en consola y se
 * ignora silenciosamente para el usuario.
 */
export function sendToGoogleSheets(row: GoogleSheetsRow): void {
  if (!webhookUrl) return;

  const payload = {
    fullName: row.fullName,
    attending: row.attending ? 'Sí' : 'No',
    phone: row.phone ?? '',
    message: row.message ?? '',
    giftName: row.giftName ?? '',
    giftOutcome: row.giftOutcome ?? '',
  };

  fetch(webhookUrl, {
    method: 'POST',
    // text/plain evita el preflight CORS que Google Apps Script no maneja.
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  }).catch((error) => {
    console.error('No se pudo registrar la respuesta en Google Sheets:', error);
  });
}
