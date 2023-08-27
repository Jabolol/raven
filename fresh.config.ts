import { defineConfig } from "$fresh/server.ts";
import twindPlugin from "$fresh/plugins/twind.ts";
import twindConfig from "~/twind.config.ts";
import inject from "~/inject.ts";
import { ga4Plugin } from "ga4/mod.ts";

export default defineConfig({
  plugins: [
    twindPlugin(twindConfig),
    ga4Plugin(),
    inject,
  ],
});
