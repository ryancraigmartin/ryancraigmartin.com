const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind')
const { join } = require('path')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      // Typography Scale
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      // Spacing Scale
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      // Border Radius
      borderRadius: {
        '4xl': '2rem',
      },
      // Box Shadow
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'strong': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      // Animation
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
    colors: {
      // Enhanced Primary Colors
      primary: {
        white: '#fffbef',
        green: '#4ca179',
        'green-light': '#6eb89a',
        'green-dark': '#3d8762',
        'alabaster': '#E8E4D9',
        'parchment': '#FEFDFB',
        'cream': '#FAF7F0',
        50: '#FAFAFA',
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
      // Enhanced Secondary Colors
      secondary: {
        50: '#F8FAFC',
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
      // Accent Colors
      accent: {
        blue: '#2563EB',
        'blue-light': '#3B82F6',
        'blue-dark': '#1D4ED8',
        purple: '#7C3AED',
        'purple-light': '#8B5CF6',
        'purple-dark': '#6D28D9',
        orange: '#EA580C',
        'orange-light': '#F97316',
        'orange-dark': '#C2410C',
      },
      // State Colors
      success: {
        50: '#F0FDF4',
        500: '#22C55E',
        600: '#16A34A',
        700: '#15803D',
      },
      warning: {
        50: '#FFFBEB',
        500: '#F59E0B',
        600: '#D97706',
        700: '#B45309',
      },
      error: {
        50: '#FEF2F2',
        500: '#EF4444',
        600: '#DC2626',
        700: '#B91C1C',
      },
      info: {
        50: '#EFF6FF',
        500: '#3B82F6',
        600: '#2563EB',
        700: '#1D4ED8',
      },
    },
    fontFamily: {
      sans: ['Manrope', 'system-ui', 'sans-serif'],
      serif: ['Georgia', 'serif'],
      mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
    },
  },
  plugins: [],
}
