import typography from '@tailwindcss/typography'
import forms from '@tailwindcss/forms'
import aspectRatio from '@tailwindcss/aspect-ratio'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: 'var(--primary-color)',
          light: 'var(--primary-color-light)',
          'extra-light': 'var(--primary-color-extra-light)',
        },
        secondary: {
          DEFAULT: 'var(--secondary-color)',
          dark: 'var(--secondary-color-dark)',
        },
        dark: {
          DEFAULT: '#0f172a',
          lighter: '#1e293b',
          darker: '#020617'
        },
        accent: {
          primary: '#3b82f6',
          secondary: '#6366f1'
        }
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'liquid': 'liquid 8s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgb(59 130 246 / 0.5), 0 0 20px rgb(59 130 246 / 0.3)' },
          '100%': { boxShadow: '0 0 10px rgb(59 130 246 / 0.8), 0 0 40px rgb(59 130 246 / 0.5)' },
        },
        liquid: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40%/50% 60% 30% 60%' },
        }
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    typography,
    forms,
    aspectRatio,
  ],
}

export default config;
