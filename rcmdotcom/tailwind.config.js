const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind')
const { join } = require('path')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
    colors: {
      // Primary Text Colors
      primary: {
        white: '#fffbef',
        green: '#4ca179',
        'alabaster': '#E8E4D9',
        'parchment': '#FEFDFB',
        100: '#F5F5F5',
        200: '#E0E0E0',
        300: '#BDBDBD',
        400: '#9E9E9E',
        500: '#757575',
        600: '#616161',
        700: '#424242',
        800: '#212121',
        900: '#000000',
      },
      // Secondary Text Colors
      secondary: {
        100: '#ECEFF1',
        200: '#CFD8DC',
        300: '#B0BEC5',
        400: '#90A4AE',
        500: '#78909C',
        600: '#607D8B',
        700: '#546E7A',
        800: '#455A64',
        900: '#37474F',
      },
    },
  },
  plugins: [],
}
