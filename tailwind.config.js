/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: 'Roboto'
      },
      colors: {
        primary: '#5D9F5D'
      }
    },
  },
  plugins: [],
}

