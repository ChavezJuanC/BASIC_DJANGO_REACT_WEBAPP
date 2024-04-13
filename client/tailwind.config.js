/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        appblue: "#008DDA",
        appbluedark: "#0277b8",
        darkgray: "#2C3E50",
        white: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
