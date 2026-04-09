const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      xs: ["12px", "1.2"],
      sm: ["14px", "1.2"],
      base: ["16px", "1.2"],
      lg: [
        "clamp(18px, calc(18px + 2 * ((100vw - 1024px) / 536)), 20px)",
        "1.2",
      ],
      xl: [
        "clamp(20px, calc(20px + 4 * ((100vw - 1024px) / 536)), 24px)",
        "1.2",
      ],
      "2xl": [
        "clamp(28px, calc(28px + 8 * ((100vw - 1024px) / 536)), 36px)",
        "1.2",
      ],
      "3xl": [
        "clamp(36px, calc(36px + 12 * ((100vw - 1024px) / 536)), 48px)",
        "1.2",
      ],
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
