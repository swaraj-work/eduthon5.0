/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#D4AF37', // Gold
        'secondary-light': '#F5E1A4',
        'secondary-dark': '#AA8C2C',
        dark: '#0C0C0C',
        light: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(to top, rgba(212, 175, 55, 0.2), transparent)',
      },
    },
  },
  plugins: [],
}