import bgImage from '../assets/fondo-bienvenida.png';
import babyImage from '../assets/bebe.jpeg';
import heroBgImage from '../assets/inicio.png';
import rsvpBgImage from '../assets/final.png';
import countdownBgImage from '../assets/fondo-cuenta-regresiva.png';
import parentsImage from '../assets/papis.png';

export const EVENT = {
  celebration: 'Baby Shower',
  parents: { mom: 'Daleska', dad: 'Junior' },
  babyName: 'Renato Alessandro',
  welcomeEyebrow: 'Nos llena de amor invitarte',
  welcomeHint: 'Toca para entrar · con música 🎵',
  heroEyebrow: 'Con todo nuestro amor',
  heroLine: 'Te esperamos para celebrar la llegada de nuestro mayor regalo',
  babyPhrase: 'Esperando con amor a nuestro pedacito de cielo',
  parentsEyebrow: 'Con amor, los papis',
  parentsPhrase: 'Mamá y papá esperando a nuestro pequeño guerrero',
  date: '2026-08-01T16:30:00-05:00', // 1 de agosto 2026, 4:30 PM, hora Perú (UTC-5)
  dateLabel: 'Sábado 01 de Agosto',
  dateYearLabel: 'Año 2026',
  timeLabel: '4:30 PM',
  timeHint: 'Puntualidad, por favor',
  venue: 'Colegio de Ingenieros',
  venueHint: 'Al costado de Shalom',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Colegio+de+Ingenieros+del+Peru+Piura',
  countdownTitle: 'Falta muy poco',
  countdownNote: 'para conocer a nuestro bebé',
  countdownDoneMessage: '¡Hoy es el gran día!',
  giftsIntro:
    'Tu presencia es nuestro mejor regalo. Si además deseas consentir al bebé, aquí te dejamos algunas ideas.',
  footerNote: '01 · 08 · 2026  ·  Piura',
  audioSrc: '/assets/audio/te-esperaba.mp3',
  bgImage,
  babyImage,
  heroBgImage,
  rsvpBgImage,
  countdownBgImage,
  parentsImage,
} as const;
