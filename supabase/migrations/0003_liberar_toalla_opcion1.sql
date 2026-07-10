-- Libera la reserva de "Toalla de baño (Opción 1)" para que vuelva a estar
-- disponible en la invitación. Borra la reserva más reciente de ese regalo
-- y decrementa su reserved_qty (con piso en 0, nunca queda negativo).
-- Es idempotente: si ya no hay reservas para este regalo, no hace nada.

with target as (
  select gr.id
  from public.gift_reservations gr
  join public.gifts g on g.id = gr.gift_id
  where g.name = 'Toalla de baño (Opción 1)'
  order by gr.created_at desc
  limit 1
)
delete from public.gift_reservations
where id in (select id from target);

update public.gifts
set reserved_qty = greatest(reserved_qty - 1, 0)
where name = 'Toalla de baño (Opción 1)';
