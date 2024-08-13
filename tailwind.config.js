/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['"Raleway"', "sans-serif"],
        // font-family: "Radio Canada Big", sans-serif;
        "radio-canada": ['"Radio Canada Big"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
