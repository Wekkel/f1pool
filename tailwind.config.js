/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Accent: zacht indigo — goed zichtbaar in zowel light als dark mode
        f1red:    "#6366F1",
        f1dark:   "#15151E",
        f1gray:   "#38383F",
        f1silver: "#C0C0C0",
        gold:     "#FFD700",
      },
      fontFamily: {
        heading: ["Titillium Web", "sans-serif"],
        body:    ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
