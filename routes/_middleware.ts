import { MiddlewareHandlerContext } from "$fresh/server.ts";

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext,
) {
  const kv = await Deno.openKv();
  const response = await ctx.next();
  const path = new URL(req.url).pathname.split("/")[1] || "/";
  const blacklist = /(\.(ico|png|svg|webmanifest|js|json))|api|_frsh/;
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
