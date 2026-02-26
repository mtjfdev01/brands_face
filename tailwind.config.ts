import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
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
