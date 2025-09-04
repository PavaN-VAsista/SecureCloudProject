/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // Use 'class' for dark mode toggle
  theme: {
    extend: {
      colors: {
        blue: {
          400: "#3B82F6",
          500: "#2563EB",
          600: "#1D4ED8",
        },
        emerald: {
          400: "#10B981",
          500: "#059669",
          600: "#047857",
        },
        slate: {
          900: "#0F172A",
        },
      },
      animation: {
        "gradient-x": "gradient 10s ease infinite",
      },
      keyframes: {
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
    },
  },
  plugins: [],
};