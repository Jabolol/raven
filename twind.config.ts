import * as colors from "twind/colors";
import { Options } from "$fresh/plugins/twind.ts";

export default {
  selfURL: import.meta.url,
  darkMode: "class",
  theme: {
    extend: {
      colors,
    },
  },
} as Options;
