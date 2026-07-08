-- Asigna imágenes a los 5 cupos de "Aporte Yape" y a 2 regalos existentes,
-- y agrega 2 artículos nuevos al catálogo (Tina bañera, Roperito).
--
-- A diferencia de supabase/seed.sql, este script NO trunca las tablas:
-- es seguro ejecutarlo aunque ya existan RSVPs o reservas reales de invitados.
-- Es idempotente (se puede volver a correr sin duplicar filas).

update public.gifts
set image_url = '49.jfif'
where category = 'cuota' and name like 'Aporte Yape S/100 · Cupo%';

update public.gifts
set image_url = '50.jfif'
where name = 'Monitor para bebé (cámara)';

update public.gifts
set image_url = '51.jfif'
where name = 'Nido colecho + pañitos';

insert into public.gifts (name, description, category, image_url, total_qty, sort_order)
select 'Tina bañera para bebé', null, 'mayores', '52.jfif', 1, 21
where not exists (select 1 from public.gifts where name = 'Tina bañera para bebé');

insert into public.gifts (name, description, category, image_url, total_qty, sort_order)
select 'Roperito para bebé', null, 'mayores', '53.jfif', 1, 22
where not exists (select 1 from public.gifts where name = 'Roperito para bebé');
