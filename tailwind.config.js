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
        raleway: ['"Jost"', "sans-serif"],
        "radio-canada": ['"Radio Canada Big"', "sans-serif"],
      },
      keyframes: {
        fadeInFromRight: {
          "0%": { opacity: "0", transform: "translateX(60px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeInFromLeft: {
          "0%": { opacity: "0", transform: "translateX(-60px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInFromTop: {
          "0%": { opacity: "0", transform: "translateY(-40px)" },

          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInFromBottom: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeInFromRight: "fadeInFromRight 1.7s ease-out",
        fadeInFromLeft: "fadeInFromLeft 1.7s ease-out",
        slideInFromTop: "slideInFromTop 1.5s ease-out",
        slideInFromBottom: "slideInFromBottom 1s ease-out",
      },
    },
  },
  plugins: [],
};
