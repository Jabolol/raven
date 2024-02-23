import { z } from "zod";
import { FreshContext } from "$fresh/server.ts";
import { perform, validators } from "~/client.ts";

const schema = z.object({
  key: z.enum(["_debug", ...Object.keys(validators)]),
  data: z.unknown(),
});

export const handler = async (
  req: Request,
  _ctx: FreshContext,
): Promise<Response> => {
  if (req.method !== "POST" || !req.headers.has("authorization")) {
    return new Response(null, { status: 405 });
  }
  const clone = req.clone();
  const valid = schema.safeParse(await clone.json());
  if (!valid.success) {
    console.log(valid.error);
    return new Response(JSON.stringify({ error: valid.error.message }), {
      headers: { "content-type": "application/json" },
      status: 400,
    });
  }
  const { key, data } = await req.json();
  const [, token] = req.headers.get("authorization")!.split(" ");
  const result = await perform(key, data, token);
  return new Response(result.error ? result.error : JSON.stringify(result), {
    headers: { "content-type": "application/json" },
    status: result.error ? 400 : 200,
  });
};
