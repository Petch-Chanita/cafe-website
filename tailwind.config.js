import plugin from "tailwindcss/plugin";
const { heroui } = require("@heroui/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        ":root": {
          "--color-primary": "#1d4ed8",
        },
      });
    }),
    heroui()
  ],
};
