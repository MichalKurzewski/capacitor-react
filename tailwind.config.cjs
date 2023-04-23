/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        pastel: "#B8F2E6",
        "pastel-hover": "#9ED9C9",
        "pastel-active": "#7EBFA6",
      },
      boxShadow: {
        delicate: "0 2px 4px rgba(0, 0, 0, 0.1)",
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      },
      colors: {
        primary: "#FF6363",
        secondary: {
          100: "#E2E2D5",
          200: "#888883",
        },
      },
      fontFamily: {
        head: ["Oswald"],
        body: ["Inter"],
      },
      transitionTimingFunction: {
        "s-curve": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
