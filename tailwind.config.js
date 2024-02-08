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
        secondary: "#948770",
        contrast: "#6B747F",
        // accent: "#F1EB90",
        // contrast: "#9FBB73"
      },
    },
  },
};
