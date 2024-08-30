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
          "0%": { opacity: "0", transform: "translateX(150px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeInFromLeft: {
          "0%": { opacity: "0", transform: "translateX(-150px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInFromTop: {
          "0%": { opacity: "0", transform: "translateY(-80px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInFromBottom: {
          "0%": { opacity: "0", transform: "translateY(70px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeInFromRight: "fadeInFromRight 1.2s ease-out",
        fadeInFromLeft: "fadeInFromLeft 1.2s ease-out",
        slideInFromTop: "slideInFromTop 1s ease-out",
        slideInFromBottom: "slideInFromBottom 1s ease-out",
      },
      // Extend custom scrollbar styles here
      scrollbar: {
        thumb: "bg-gray-400 rounded", // Customize scrollbar thumb color and shape
        track: "bg-gray-200", // Customize scrollbar track color
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"), // Add the scrollbar plugin here
  ],
};
