import { FreshContext } from "$fresh/server.ts";

export const handler = async (
  req: Request,
  _ctx: FreshContext,
): Promise<Response> => {
  if (req.method !== "POST") {
    return new Response(null, { status: 405 });
  }

  const { access_token } = await req.json() as {
    access_token?: string;
  };

  if (!access_token) {
    return new Response(null, { status: 400 });
  }

  const feedResponse = await fetch(
    "https://mobile.bereal.com/api/feeds/friends-v1",
    {
      headers: {
        authorization: `Bearer ${access_token}`,
      },
    },
  );

  if (!feedResponse.ok) {
    return new Response(
      JSON.stringify(
        await feedResponse.json(),
      ),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  return new Response(
    JSON.stringify(
      await feedResponse.json(),
    ),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};
