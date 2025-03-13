import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";
export default {
  content: [
    "./node_modules/@heroui/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
    "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
  ]
  ,
  theme: {
    extend: {
      fontFamily: {
        caveat: ["Caveat", "cursive"], // Cambié "caveats" a "caveat"
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
    },
  },
  plugins: [
    heroui({
      defaultTheme: "light",
    })
  ],
} satisfies Config;
