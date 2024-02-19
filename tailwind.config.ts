import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        primary: "#D3AF6C",
        secondary: "#544E42",
        contrast: "#6B747F",
        "contrast-secondary": "#948770",
        accent: "#F1EB90",
      },
    }
  }
}