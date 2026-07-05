-- ========== TABLAS ==========
create table if not exists public.gifts (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  description  text,
  category     text,
  image_url    text,
  store_url    text,                       -- enlace opcional a la tienda
  price_ref    numeric,                     -- referencia de precio (opcional)
  total_qty    int  not null default 1 check (total_qty >= 1),
  reserved_qty int  not null default 0 check (reserved_qty >= 0),
  is_active    boolean not null default true,
  sort_order   int  not null default 0,
  created_at   timestamptz not null default now(),
  constraint chk_reserved_le_total check (reserved_qty <= total_qty)
);

create table if not exists public.gift_reservations (
  id          uuid primary key default gen_random_uuid(),
  gift_id     uuid not null references public.gifts(id) on delete cascade,
  guest_name  text not null,
  guest_phone text,
  qty         int  not null default 1 check (qty >= 1),
  created_at  timestamptz not null default now()
);

create table if not exists public.rsvps (
  id         uuid primary key default gen_random_uuid(),
  full_name  text not null,
  attending  boolean not null,
  message    text,
  created_at timestamptz not null default now()
);

-- ========== RPC ATÓMICA: reservar regalo con bloqueo de fila ==========
-- Evita que dos invitados reserven la última unidad al mismo tiempo.
create or replace function public.reservar_regalo(
  p_gift_id     uuid,
  p_guest_name  text,
  p_guest_phone text,
  p_qty         int default 1
)
returns public.gifts
language plpgsql
security definer
set search_path = public
as $$
declare
  v_gift public.gifts;
begin
  if coalesce(trim(p_guest_name), '') = '' then
    raise exception 'NOMBRE_REQUERIDO';
  end if;
  if p_qty is null or p_qty < 1 then
    raise exception 'CANTIDAD_INVALIDA';
  end if;

  -- Bloqueo de la fila del regalo (patrón FOR UPDATE) mientras dura la transacción
  select * into v_gift
  from public.gifts
  where id = p_gift_id and is_active = true
  for update;

  if not found then
    raise exception 'REGALO_NO_DISPONIBLE';
  end if;

  if (v_gift.total_qty - v_gift.reserved_qty) < p_qty then
    raise exception 'SIN_STOCK';
  end if;

  insert into public.gift_reservations (gift_id, guest_name, guest_phone, qty)
  values (p_gift_id, trim(p_guest_name), nullif(trim(p_guest_phone), ''), p_qty);

  update public.gifts
  set reserved_qty = reserved_qty + p_qty
  where id = p_gift_id
  returning * into v_gift;

  return v_gift;
end;
$$;

-- ========== RLS ==========
alter table public.gifts             enable row level security;
alter table public.gift_reservations enable row level security;
alter table public.rsvps             enable row level security;

-- Cualquiera puede VER los regalos activos
create policy "gifts_select_public" on public.gifts
  for select using (is_active = true);

-- Cualquiera puede confirmar asistencia (insertar RSVP)
create policy "rsvps_insert_public" on public.rsvps
  for insert with check (true);

-- Las reservas NO se insertan directo desde el cliente: solo vía la RPC
-- (security definer). Por eso no se crea policy de insert público aquí.

-- Permitir ejecutar la RPC al rol anónimo
grant execute on function public.reservar_regalo(uuid, text, text, int) to anon;
