-- Regalos de ejemplo para la invitación de Daleska & Junior.
-- Ejecutar después de 0001_init.sql en el SQL Editor de Supabase.

insert into public.gifts (name, description, category, store_url, total_qty, sort_order) values
('Pañales talla P/M', 'Paquetes de pañales talla P y M, siempre son bienvenidos los primeros meses.', 'esenciales', null, 3, 1),
('Coche de bebé', 'Coche paseador liviano, ideal para salidas cortas.', 'esenciales', 'https://www.falabella.com.pe/falabella-pe/category/cat50032/Coches-de-bebe', 1, 2),
('Body y pijamas 0-6 meses', 'Set de bodies y pijamas de algodón para los primeros meses.', 'ropa', 'https://www.ripley.com.pe/moda/bebes', 2, 3),
('Biberones y esterilizador', 'Set de biberones anticólicos con esterilizador a vapor.', 'alimentacion', null, 1, 4),
('Bañera y kit de aseo', 'Bañera plegable con kit de aseo (shampoo, jabón, colonia).', 'cuidado', null, 1, 5),
('Detalle libre', 'Un obsequio a tu elección, hecho con todo el corazón.', 'libre', null, 5, 6);
