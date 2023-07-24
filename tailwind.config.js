const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '425px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        sleep: {
          awake: '#ffec70',
          light: '#85fbff',
          deep: '#4488fc',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      dropShadow: {
        'thick': '0 0 0.4rem var(--tw-shadow-color)',
      },
      scale: {
        '120': '1.2',
      },
      textShadow: {
        none: 'none',
        sm: '0 0 0.4rem var(--tw-shadow-color), '.repeat(2).slice(0, -2),
        DEFAULT: '0 0 0.4rem var(--tw-shadow-color), '.repeat(4).slice(0, -2),
        lg: '0 0 0.4rem var(--tw-shadow-color), '.repeat(7).slice(0, -2),
      },
    },
  },
  plugins: [
    plugin(({matchUtilities, theme}) => {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        {values: theme('textShadow')},
      );
    }),
  ],
};
