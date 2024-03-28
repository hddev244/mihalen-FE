import type { Config } from "tailwindcss";

const { colors: defaultColors } = require('tailwindcss/defaultTheme')
const colors = {
  ...defaultColors,
  ...{
    'themeColor': "#C22B3B",
    'themeColor-btn': "#ED5565",
  }
}

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

    }
    // ,
    // colors: colors,
  },
  plugins: [],
};
export default config;
