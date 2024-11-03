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
        "opacity-open-filter": 'opacity-open-filter 200ms ease-in both',
        "opacity-close-filter": 'opacity-close-filter 200ms ease-out both',
      },
      keyframes: {
        "opacity-open": {
          '0%': {
             opacity: 0,
          },
          '50%': {
             opacity: 0.5,
          },
          '100%': {
            opacity: 1,
          }
        },
        "opacity-close": {
          '0%': {
            opacity: 1,
          },
          '50%': {
             opacity: 0.5,
          },
          '100%': {
            opacity: 0,
          }
        },
        "opacity-open-filter": {
          '0%': {
             opacity: 0,
             height: 0
          },
          '50%': {
             opacity: 0,
             height: "60px"
          },
          '100%': {
            opacity: 1,
            height: "60px",
          }
        },
        "opacity-close-filter": {
          '0%': {
            opacity: 1,
            height: "60px",
          },
          '50%': {
             opacity: 0,
             height: "60px"
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
