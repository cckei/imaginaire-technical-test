const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      xs: ["12px", "1.2"],
      sm: ["14px", "1.2"],
      base: ["16px", "1.2"],
      lg: ["20px", "1.2"],
      xl: ["24px", "1.2"],
      "2xl": ["36px", "1.2"],
      "3xl": ["48px", "1.2"],
    },
    screens: {
      desktopXl: { min: "1560px" },
      desktop: { min: "1025px" },
      laptop: { max: "1300px" },
      tablet: { max: "1024px" },
      mobile: { max: "720px" },
    },
    fontFamily: {
      sans: [
        "Inter",
        "system-ui",
        "Segoe UI",
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif",
      ],
      serif: [
        "Georgia",
        "Times New Roman",
        "Times",
        "serif",
      ],
    },
    extend: {
      transitionDuration: {
        DEFAULT: "300ms",
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("supports-hover", "@media (hover: hover)");
    }),
  ],
};
