import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'hiw-step-in': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'hiw-icon-pop': {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '70%': { transform: 'scale(1.02)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'hiw-step-in': 'hiw-step-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) both',
        'hiw-icon-pop': 'hiw-icon-pop 0.65s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
      colors: {
        'light-green': 'var(--light-green)',
        'light-theme': 'var(--color-light-theme)',
        kraft: '#c4a265',
        panel: '#1e1e2e',
        surface: '#2a2a3c',
        accent: '#7c5cfc',
        'accent-light': '#9d85fd',
      },
    },
  },
  plugins: [],
};

export default config;
