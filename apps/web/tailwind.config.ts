import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '480px',
      },
      colors: {
        primary: {
          DEFAULT: '#000000',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#FFFFFF',
          foreground: '#000000',
        },
        contrast: {
          DEFAULT: '#A7A0A0',
        },
        error: {
          DEFAULT: '#E63143',
          dark: '#C22440',
          light: '#F8909D',
        },
        ring: '#A7A0A0',
        background: '#FFFFFF',
      },
    },
  },
};

export default config;
