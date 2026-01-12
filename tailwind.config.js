/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#f43f5e',
        tertiary: '#fbbf24',
        quaternary: '#a855f7',
        accent: '#4ade80',
        'color-1': 'var(--color-1)',
        'color-2': 'var(--color-2)',
        'color-3': 'var(--color-3)',
        'color-4': 'var(--color-4)',
      },
      borderRadius: {
        'default': '12px',
      },
    },
  },
  plugins: [],
}
