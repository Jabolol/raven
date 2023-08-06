import { HandlerContext } from "$fresh/server.ts";

export const handler = async (
  req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  if (req.method !== "POST") {
    return new Response(null, { status: 405 });
  }

  const { access_token, profile_id } = await req.json() as {
    access_token?: string;
    profile_id?: string;
  };

  if (!access_token || !profile_id) {
    return new Response(null, { status: 400 });
  }

  const friendResponse = await fetch(
    `https://mobile.bereal.com/api/person/profiles/${profile_id}`,
    {
      headers: {
        authorization: `Bearer ${access_token}`,
      },
    },
  );

  if (!friendResponse.ok) {
    return new Response(null, { status: 401 });
  }

  return new Response(
    JSON.stringify(
      await friendResponse.json(),
    ),
    { status: 200 },
  );
};
