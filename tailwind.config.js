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
        "opacity-open": 'opacity-open 500ms ease-in both',
        "opacity-close": 'opacity-close 500ms ease-out both',
        "opacity-open-filter": 'opacity-open-filter 500ms ease-in both',
        "opacity-close-filter": 'opacity-close-filter 500ms ease-out both',
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
             height: "120px"
          },
          '100%': {
            opacity: 1,
            height: "120px",
          }
        },
        "opacity-close-filter": {
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
