/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fffbf0',
          100: '#fef4d6',
          200: '#fce5ab',
          300: '#f9cf75',
          400: '#f5b13e',
          500: '#d98c19',
          600: '#b86b11',
          700: '#944b11',
          800: '#793c14',
          900: '#643215',
          950: '#391809',
        },
        emeraldLuxury: {
          900: '#04221b',
          950: '#011410',
        },
        obsidian: '#0d0f12',
        charcoal: '#161920',
      },
      fontFamily: {
        arabic: ['Tajawal', 'sans-serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
