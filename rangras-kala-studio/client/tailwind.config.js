/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2C1810",
        secondary: "#D4A853",
        accent: "#E8C99A",
        background: "#FDF6EC",
        text: "#1A1209",
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body: ["DM Sans", "sans-serif"],
        accent: ["Dancing Script", "cursive"],
      },
    },
  },
  plugins: [],
};
