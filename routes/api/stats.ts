import { DAY } from "std/datetime/constants.ts";
import { chunk } from "std/collections/chunk.ts";
import { FreshContext } from "$fresh/server.ts";

export const handler = async (
  req: Request,
  _ctx: FreshContext,
): Promise<Response> => {
  if (req.method !== "GET") {
    return new Response(null, { status: 405 });
  }

  const msAgo = 30 * DAY;
  const dates = [];
  const now = Date.now();
  const start = new Date(now - msAgo);

  while (+start < now) {
    start.setDate(start.getDate() + 1);
    dates.push(new Date(new Date(start).toISOString().split("T")[0]));
  }

  const kv = await Deno.openKv();

  const queries = ["total", "user", "me", "/", "stats", "discovery"].map((
    value,
  ) => ["visits", value]);

  const results: { [k: string]: number[] } = {};

  for (const [property, value] of queries) {
    const keys = dates.map((date) => [
      property,
      value,
      new Date(date).toISOString().split("T")[0],
    ]);

    const promises = [];
    for (const batch of chunk(keys, 10)) {
      promises.push(kv.getMany<bigint[]>(batch));
    }

    const res = (await Promise.all(promises)).flat().map((entry) =>
      entry?.value
    );
    results[value] = res.map(Number);
  }

  kv.close();

  return new Response(
    JSON.stringify({ dates, results }, null, 2),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};
