import type { Config } from "tailwindcss";


const {nextui} = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'themeColor': "#C20A01",
        'themeColor-btn': "#ED5565",
        'theme-text': "#333",
        'success': '#2ECC71',
        'error': '#ff3333',
        'warning': '#F39C12',
        'info': '#3498DB',
        "theme-hover" : "#ED5565",
      },
      keyframes: {
        wiggle: {
          "0%": { 
              transform: "translateX(100%)",
              opacity: "0"
           },
          "20%": { transform: "translateX(0%) ",
          opacity: "1"
           },
           "70%": { transform: "translateX(0%) ",
          opacity: "1"
           },
          "100%": { 
              transform: "translateY(200%)",
              opacity: "0"
           },
        },
        navbarShow: {
          "0%": { 
              transform: "translateX(-100%)",
              opacity: "0"
           },
          "20%": { transform: "translateX(-50%) ",
          opacity: ".5"
           },
           "70%": { transform: "translateX(-30%) ",
          opacity: "1"
           },
          "100%": { 
              transform: "translatX(00%)",
              opacity: "1"
           },
        },
      },
      width: {
        'max': "1200px",
      },
      animation: {
        wiggle: "wiggle 2s ease-in-out linear",
        navbarShow: "navbarShow 0.5s ease-in-out linear",
      },

    }
    // ,
    // colors: colors,
  },
  // darkMode: "class",
  plugins: [nextui()],
};
export default config;
