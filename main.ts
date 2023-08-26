/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import "$std/dotenv/load.ts";

import { start } from "$fresh/server.ts";
import manifest from "~/fresh.gen.ts";

import twindPlugin from "$fresh/plugins/twind.ts";
import twindConfig from "~/twind.config.ts";

import { ga4Plugin } from "ga4/mod.ts";
import inject from "~/inject.ts";

await start(manifest, {
  plugins: [twindPlugin(twindConfig), inject, ga4Plugin()],
});
