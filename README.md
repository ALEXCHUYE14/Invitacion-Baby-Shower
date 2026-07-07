# Baby Shower · Daleska & Junior

Invitación web con lista de regalos (con reserva) y confirmación de asistencia (RSVP), construida con React + TypeScript + Vite + Tailwind y Supabase como backend.

## Requisitos

- Node.js 18 o superior
- Una cuenta gratuita en [supabase.com](https://supabase.com)

## 1. Instalación

```bash
npm install
```

## 2. Crear el proyecto en Supabase

1. Entra a [supabase.com](https://supabase.com) → **New project**.
2. Cuando esté listo, ve a **Project Settings → API** y copia:
   - `Project URL`
   - `anon public` key
3. Crea un archivo `.env` en la raíz (puedes copiar `.env.example`) y pega ahí esos valores:

```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key
```

## 3. Aplicar la migración y el seed

En el panel de Supabase, abre **SQL Editor → New query**:

1. Pega el contenido completo de [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql) y ejecútalo (crea las tablas `gifts`, `gift_reservations`, `rsvps`, la función `reservar_regalo` y las políticas RLS).
2. Pega el contenido de [`supabase/seed.sql`](supabase/seed.sql) y ejecútalo (agrega 6 regalos de ejemplo). Edítalo antes si quieres tus propios regalos.

## 4. Assets (fotos y audio)

Ya están incluidos en `public/assets/`:

- `public/assets/fondo-bienvenida.png` — fondo del splash
- `public/assets/bebe.jpeg` — foto del bebé
- `public/assets/audio/te-esperaba.mp3` — música de fondo

Para reemplazarlos, sobrescribe esos mismos archivos (mismo nombre) o actualiza las rutas en `src/config/event.config.ts`.

## 5. Datos del evento

Toda la información del evento (nombres, fecha, lugar, textos, enlace de Google Maps) vive en un único archivo:

```
src/config/event.config.ts
```

Edítalo para cambiar fecha, lugar o cualquier texto — los componentes no tienen datos del evento hardcodeados.

## 6. Correr en desarrollo

```bash
npm run dev
```

Abre la URL que muestra la terminal (por defecto `http://localhost:5173`).

## 7. Build de producción

```bash
npm run build
```

Corre el type-check de TypeScript y genera el sitio estático en `dist/`. Sirve `dist/` con cualquier hosting estático (Vercel, Netlify, Cloudflare Pages, etc.) configurando las mismas variables de entorno `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` en el panel del hosting.

## 8. Google Sheets (copia de cada RSVP + regalo elegido)

Cada vez que alguien confirma asistencia, la app **siempre** guarda primero en Supabase (es la fuente de verdad: RSVPs, reservas de regalo y control de stock). Si configuras esto, además se copia una fila a tu Google Sheet — es un extra de solo lectura para ti, nunca bloquea ni rompe el formulario si falla o no está configurado.

### 8.1 Crear el Apps Script dentro de tu Sheet

1. Abre tu spreadsheet: https://docs.google.com/spreadsheets/d/1FDDgW3f8_BsfF1GChbaYTMFz-5dlN0pXyWlvDDZJnnA/edit
2. Menú **Extensiones → Apps Script**.
3. Borra el contenido de `Code.gs` y pega esto:

```javascript
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Fecha', 'Nombre completo', '¿Asistirá?', 'Teléfono', 'Mensaje', 'Regalo elegido', 'Estado del regalo',
      ]);
    }

    sheet.appendRow([
      new Date(),
      data.fullName || '',
      data.attending || '',
      data.phone || '',
      data.message || '',
      data.giftName || '',
      data.giftOutcome || '',
    ]);

    return ContentService.createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Guarda (ícono de disquete o `Ctrl+S`). Ponle un nombre al proyecto, por ejemplo "RSVP Baby Shower".

### 8.2 Publicarlo como Web App

1. Arriba a la derecha, botón azul **Implementar → Nueva implementación**.
2. Junto a "Selecciona el tipo", click en el ícono de engranaje ⚙️ → **Aplicación web**.
3. Configura:
   - **Ejecutar como:** Yo (tu cuenta de Google)
   - **Quién tiene acceso:** Cualquier usuario
4. Click **Implementar**. Google te pedirá **autorizar permisos** la primera vez (es tu propio script accediendo a tu propio Sheet — aprueba con tu cuenta, aunque salga el aviso de "app no verificada", click en "Avanzado → Ir a... (no seguro)").
5. Copia la **URL de la aplicación web** que te da (termina en `/exec`). Esa es la que necesitas.

> Si más adelante editas el script, tienes que volver a "Implementar → Administrar implementaciones → ✏️ Editar → Nueva versión → Implementar" para que los cambios surtan efecto en esa misma URL.

### 8.3 Conectarlo a la invitación

Pega esa URL como variable de entorno:

```
VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/AKfycbwBReZbUm0trTipowXBArd0uJW49wzNOSAKx24P0CeJ-rDLLpSMnUAcFHdqxwZrSF92/exec
```

- **En local:** agrégala a tu `.env`.
- **En Vercel:** Project Settings → Environment Variables → agrega `VITE_GOOGLE_SHEETS_URL` con esa URL → vuelve a desplegar (`vercel --prod`) para que el build la incluya.

Cada fila en el Sheet incluirá: fecha, nombre completo, si asistirá, teléfono, mensaje y el regalo que eligió (si eligió uno).

## Arquitectura

```
src/
├─ config/event.config.ts   # única fuente de verdad del evento
├─ lib/supabase.ts          # cliente único de Supabase
├─ types/index.ts           # tipos compartidos
├─ hooks/                   # toda la lógica de datos y estado vive aquí
├─ components/ui/           # primitivos tontos (sin llamadas a datos)
└─ components/sections/     # secciones de la invitación
```

- Ningún componente llama directamente a Supabase; siempre pasa por un hook (`useGifts`, `useRsvp`).
- La reserva de regalos usa la función `reservar_regalo` (RPC con `FOR UPDATE`), que bloquea la fila del regalo durante la transacción. Si dos personas intentan reservar la última unidad al mismo tiempo, solo una lo logra; la otra recibe el mensaje "Justo se agotaron las unidades disponibles".

## Panel admin (pendiente)

Esta entrega no incluye el panel `/admin` (CRUD de regalos, ver RSVPs, ver reservas). Quedó fuera de alcance a pedido explícito para priorizar la invitación pública. Para añadirlo después:

1. Agregar `react-router-dom` y una ruta `/admin`.
2. Proteger la ruta con Supabase Auth (email/password).
3. Añadir políticas RLS para usuarios autenticados (`select`/`update`/`delete` sobre `gifts`, `select` sobre `rsvps` y `gift_reservations`) en una nueva migración `0002_admin.sql`.
4. Construir las vistas dentro de `src/features/admin/`.

## Notas de diseño

Sistema de diseño "Pedacito de cielo": tipografías Playfair Display / Cormorant Garamond / Jost, paleta de amanecer (marfil, azul dusk, blush durazno, oro champagne) definida como tokens en `tailwind.config.ts`. El motivo visual (marco en arco para la foto del bebé, horizonte difuminado detrás del cronómetro) está en `BabySection.tsx` y `Countdown.tsx`.
