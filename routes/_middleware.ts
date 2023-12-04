import { FreshContext } from "$fresh/server.ts";

export async function handler(
  req: Request,
  ctx: FreshContext,
) {
  const response = await ctx.next();

  if (ctx.destination !== "route") {
    return response;
  }

  const kv = await Deno.openKv();
  const path = new URL(req.url).pathname.split("/")[1] || "/";
  const blacklist = /api/;
  const visitsKey = [
    "visits",
    "total",
    (new Date()).toISOString().split("T")[0],
  ];
  const routeKey = ["visits", path, (new Date()).toISOString().split("T")[0]];

  if (!response.ok || blacklist.test(path)) {
    kv.close();
    return response;
  }

  await kv.atomic().sum(visitsKey, 1n).commit();
  await kv.atomic().sum(routeKey, 1n).commit();
  kv.close();

  return response;
}
