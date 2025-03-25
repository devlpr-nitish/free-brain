import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray:{
            100:"#eeeeef",
            200:"#e6e9ed",
            300:"#95989c"
        },
        purple: {
          300: "#e0e7fe",
          500: "#3e387a",
          600: "#5046e4",
        },
        
      },
    },
  },
  plugins: [],
};

export default config;
