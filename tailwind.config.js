/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Fascinate: ['Fascinate'],
        Roboto: ['Roboto', 'sans-serif'],
        VT323: ['VT323', 'monospace'],
        DancingScript: ['"Dancing Script"', 'cursive'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
