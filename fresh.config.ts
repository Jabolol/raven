import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";
import { ga4Plugin } from "ga4/mod.ts";
import inject from "~/plugins/inject.ts";

export default defineConfig({
  plugins: [
    tailwind(),
    ga4Plugin(),
    inject,
  ],
});
