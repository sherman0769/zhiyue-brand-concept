import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        forest: "#344740",
        ivory: "#F5F1E9",
        sage: "#778275",
        copper: "#A8785C",
        ink: "#25302E",
        mist: "#E8E4DA",
        bone: "#FBF8F1"
      },
      fontFamily: {
        sans: [
          "var(--font-noto-sans-tc)",
          "Inter",
          "system-ui",
          "sans-serif"
        ],
        serif: [
          "var(--font-noto-serif-tc)",
          "Georgia",
          "serif"
        ]
      },
      boxShadow: {
        soft: "0 18px 60px rgba(37, 48, 46, 0.14)"
      }
    }
  },
  plugins: []
};

export default config;
