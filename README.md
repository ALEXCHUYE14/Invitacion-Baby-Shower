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
