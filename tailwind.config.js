/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        shopee: '#EE4D2D',
        lazada: '#0F146D',
        grab: '#00B14F',
        lineman: '#00B900',
        foodpanda: '#D70F64',
        truemoney: '#FF6600',
        klook: '#FF5722',
      },
      fontFamily: {
        thai: ['Sarabun', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
