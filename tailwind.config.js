const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      xs: ["12px", "12px"],
      sm: ["14px", "14px"],
      base: ["16px", "16px"],
      lg: ["20px", "20px"],
      xl: ["24px", "24px"],
      "2xl": ["36px", "36px"],
      "3xl": ["48px", "48px"],
    },
    screens: {
      desktop: { min: "100%" },
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
