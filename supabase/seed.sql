-- Catálogo de regalos para la invitación de Daleska & Junior (tema Dragon Ball Z).
-- Ejecutar después de 0001_init.sql en el SQL Editor de Supabase.
-- Es idempotente: se puede volver a ejecutar sin duplicar filas.

truncate table public.gift_reservations, public.gifts restart identity cascade;

insert into public.gifts (name, description, category, image_url, total_qty, sort_order) values
-- A. Cuota / aporte en efectivo (5 cupos independientes)
('Aporte Yape S/100 · Cupo 1', 'Un aporte directo por Yape para lo que más necesiten los papás.', 'cuota', '49.jfif', 1, 1),
('Aporte Yape S/100 · Cupo 2', 'Un aporte directo por Yape para lo que más necesiten los papás.', 'cuota', '49.jfif', 1, 2),
('Aporte Yape S/100 · Cupo 3', 'Un aporte directo por Yape para lo que más necesiten los papás.', 'cuota', '49.jfif', 1, 3),
('Aporte Yape S/100 · Cupo 4', 'Un aporte directo por Yape para lo que más necesiten los papás.', 'cuota', '49.jfif', 1, 4),
('Aporte Yape S/100 · Cupo 5', 'Un aporte directo por Yape para lo que más necesiten los papás.', 'cuota', '49.jfif', 1, 5),

-- B. Artículos mayores e infraestructura
('Cuna', null, 'mayores', '1.jfif', 1, 10),
('Cuna corral', null, 'mayores', '2.jfif', 1, 11),
('Coche de paseo', 'Color: Negro / Plomo.', 'mayores', '3.jfif', 1, 12),
('Bañera', null, 'mayores', '4.jfif', 1, 13),
('Cambiador', null, 'mayores', '5.jfif', 1, 14),
('Cómoda', null, 'mayores', '6.jfif', 1, 15),
('Malla para bañeras', null, 'mayores', '7.jfif', 1, 16),
('Silla para comer', null, 'mayores', '8.jfif', 1, 17),
('Alfombra antigolpes', null, 'mayores', '29.jpg', 1, 18),
('Gimnasio estimulador', null, 'mayores', '31.jpg', 1, 19),
('Silla mecedora BB', null, 'mayores', '33.jpg', 1, 20),
('Tina bañera para bebé', null, 'mayores', '52.jfif', 1, 21),
('Roperito para bebé', null, 'mayores', '53.jfif', 1, 22),

-- C. Lactancia, alimentación e higiene eléctrica
('Aspirador nasal eléctrico', null, 'lactancia', '9.jfif', 1, 30),
('Secador de biberones', null, 'lactancia', '12.jfif', 1, 31),
('Biberón Phillips chico', null, 'lactancia', '13.jfif', 1, 32),
('Biberón Phillips mediano', null, 'lactancia', '14.jfif', 1, 33),
('Esterilizador de biberones', null, 'lactancia', '15.jfif', 1, 34),
('Almohada para lactancia', null, 'lactancia', '16.jfif', 1, 35),
('Termómetro para agua + Lámpara luz roja', null, 'lactancia', '27.jfif', 1, 36),
('Calentador de pañitos', null, 'lactancia', '28.jpg', 1, 37),
('Extractor de leche eléctrico', null, 'lactancia', '30.jpg', 1, 38),

-- D. Ropa, textiles y cuidado corporal
('Toalla de baño (Opción 1)', null, 'ropa', '10.jfif', 1, 50),
('Toalla de baño (Opción 2)', null, 'ropa', '11.jfif', 1, 51),
('Fular + pañitos húmedos', 'Color: Negro.', 'ropa', '17.jfif', 1, 52),
('Kit de cuidado higiene RN', 'Recién nacido.', 'ropa', '18.jfif', 1, 53),
('Shampoo', 'Marcas: Dr. Zaidman o Eucerin.', 'ropa', '19.jfif', 1, 54),
('Jabón líquido', 'Marcas: Dr. Zaidman o Eucerin.', 'ropa', '20.jfif', 1, 55),
('Set de bodys (Talla 0-3M)', null, 'ropa', '21.jfif', 1, 56),
('Set de bodys (Talla 0-6M) · Opción A', null, 'ropa', '22.jfif', 1, 57),
('Set de bodys (Talla 0-6M) · Opción B', null, 'ropa', '23.jfif', 1, 58),
('Gorritos / medias / calcetines', null, 'ropa', '24.jfif', 1, 59),
('Bolso maternal', 'Color: Negro / Beige.', 'ropa', '25.jpg', 1, 60),
('Sábana para cunas', null, 'ropa', '26.jpg', 1, 61),
('Set de colcha fina', null, 'ropa', '34.jpg', 1, 62),
('Colchas gruesas', null, 'ropa', '35.jpg', 1, 63),
('Crema para escaldaduras', 'Marcas: Dr. Zaidman o Eucerin.', 'ropa', '36.jpg', 1, 64),
('Toallas para bebé (Opción A)', null, 'ropa', '37.jpg', 1, 65),
('Toallas para BB (Opción B)', null, 'ropa', '38.jpg', 1, 66),
('Canguro (portabebé)', null, 'ropa', '39.jpg', 1, 67),
('Zapatitos 6 meses + pañales', null, 'ropa', '40.jfif', 1, 68),
('Zapatitos (Opción B) + pañales', null, 'ropa', '41.jfif', 1, 69),
('Conjunto ropa RN + pañales (Opción A)', 'Recién nacido.', 'ropa', '42.jfif', 1, 70),
('Conjunto ropa RN + pañales (Opción B)', 'Recién nacido.', 'ropa', '43.jfif', 1, 71),
('Conjunto ropa RN + pañales (Opción C)', 'Recién nacido.', 'ropa', '44.jfif', 1, 72),
('Conjunto ropa RN + pañales (Opción D)', 'Recién nacido.', 'ropa', '45.jfif', 1, 73),
('Saquitos de dormir (Opción A)', null, 'ropa', '46.jpg', 1, 74),
('Saquitos de dormir (Opción B)', null, 'ropa', '47.jpg', 1, 75),
('Juego de sábanas para cuna', null, 'ropa', '48.jpg', 1, 76),

-- E. Entretenimiento, estimulación y adicionales
('Monitor para bebé (cámara)', null, 'entretenimiento', '50.jfif', 1, 80),
('Nido colecho + pañitos', null, 'entretenimiento', '51.jfif', 1, 81),
('Sonajeros / juguetes de estimulación', null, 'entretenimiento', '32.jpg', 1, 82);
