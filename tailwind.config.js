/** @type {import('tailwindcss').Config} */
import PrimeUI from 'tailwindcss-primeui';

module.exports = {
  darkMode: false,
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [PrimeUI],
}

