/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Roboto", "serif"],
    },
    extend: {
      colors: {
        primary: "#007F6E",
      },
      animation: {
        "opacity-open": 'opacity-open 200ms ease-in both',
        "opacity-close": 'opacity-close 200ms ease-out both',
      },
      keyframes: {
        "opacity-open": {
          '0%': {
             opacity: 0,
             height: 0
          },
          '50%': {
             opacity: 0,
             height: "120px"
          },
          '100%': {
            opacity: 1,
            height: "120px",
          }
        },
        "opacity-close": {
          '0%': {
            opacity: 1,
            height: "120px",
          },
          '50%': {
             opacity: 0,
             height: "120px"
          },
          '100%': {
            opacity: 0,
            height: 0
          }
        }
      }
    },
  },
  plugins: [],
};
