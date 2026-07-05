import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FAF6F0',
        paper2: '#F2EBE1',
        sky: '#AEBBD0',
        skyDeep: '#8794AE',
        blush: '#E3C2B4',
        gold: '#B8945F',
        goldSoft: '#D8BC8E',
        ink: '#3B3742',
        inkSoft: '#6B6570',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        emot: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', '-apple-system', 'sans-serif'],
      },
      transitionTimingFunction: {
        signature: 'cubic-bezier(.16,.84,.44,1)',
      },
      keyframes: {
        pulseRing: {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        tick: {
          '0%': { opacity: '0.35', transform: 'translateY(-6px)' },
          '100%': { opacity: '1', transform: 'none' },
        },
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'pulse-ring': 'pulseRing 2.4s cubic-bezier(.16,.84,.44,1) infinite',
        tick: 'tick .5s cubic-bezier(.16,.84,.44,1)',
        spin: 'spin .8s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
