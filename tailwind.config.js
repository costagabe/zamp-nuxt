/** @type {import('tailwindcss').Config} */
export default {
  plugins: [require("daisyui")],
  daisyui: {
    prefix: "",
  },
  content: [],
  theme: {
    extend: {
      colors: {
        primary: "#D3AF6C",
        secondary: "#544E42",
        contrast: "#6B747F",
        "contrast-secondary": "#948770",
        accent: "#F1EB90",
      },
    },
  },
};
