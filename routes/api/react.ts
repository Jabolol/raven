import { FreshContext } from "$fresh/server.ts";

export const handler = async (
  req: Request,
  _ctx: FreshContext,
): Promise<Response> => {
  if (req.method !== "POST") {
    return new Response(null, { status: 405 });
  }

  const { emoji, access_token, postId, postUserId } = await req.json() as {
    emoji?: string;
    access_token?: string;
    postId?: string;
    postUserId?: string;
  };

  if (!emoji || !access_token || !postId || !postUserId) {
    return new Response(null, { status: 400 });
  }

  const reactResponse = await fetch(
    `https://mobile.bereal.com/api/content/realmojis?postId=${postId}&postUserId=${postUserId}`,
    {
      headers: {
        authorization: `Bearer ${access_token}`,
        "bereal-app-version-code": "14549",
        "bereal-signature": "berealsignature",
        "bereal-device-id": "berealdeviceid",
      },
      method: "POST",
      body: JSON.stringify({
        emoji,
      }),
    },
  );

  if (!reactResponse.ok) {
    return new Response(
      JSON.stringify(
        await reactResponse.json(),
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
      await reactResponse.json(),
    ),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};
