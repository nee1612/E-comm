/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      smobile: "320px",
      mmobile: "376px",
      lmobile: "426px",
      sm: "640px",
      md: "768px",
      mmd: "900px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        // raleway: ['"Raleway"', "sans-serif"],
        raleway: ['"Jost"', "sans-serif"],
        // font-family: "Radio Canada Big", sans-serif;
        "radio-canada": ['"Radio Canada Big"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
