import type { Config } from "tailwindcss";

const {nextui} = require("@nextui-org/react");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg": "#121212",
        "surface": "#121212",
        "dark-border": "#999999",
        "light-border": "#222222",
        "error": "#CF6679",
        "primary": "#BB86FC",
        "variant": "#3700B3",
        "secondary": "#03DAC6",
        "spotify-green": "#1DB954",
      },
    },
  },
  darkMode: "selector",
  plugins: [],
};
export default config;
