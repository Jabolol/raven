import { type Config } from "tailwindcss";
import * as colors from "twind/colors";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors,
    },
  },
} satisfies Config;
