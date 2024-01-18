import { FreshContext } from "$fresh/server.ts";

export const handler = async (
  req: Request,
  _ctx: FreshContext,
): Promise<Response> => {
  if (req.method !== "POST") {
    return new Response(null, { status: 405 });
  }

  const { access_token, userId } = await req.json() as {
    access_token?: string;
    userId?: string;
  };

  if (!access_token || !userId) {
    return new Response(null, { status: 400 });
  }

  const meResponse = await fetch(
    `https://mobile.bereal.com/api/relationships/friend-requests`,
    {
      headers: {
        authorization: `Bearer ${access_token}`,
        "bereal-app-version-code": "14549",
        "bereal-signature": "berealsignature",
        "bereal-device-id": "berealdeviceid",
      },
      method: "POST",
      body: JSON.stringify({
        userId,
        source: "search",
      }),
    },
  );

  if (!meResponse.ok) {
    return new Response(
      JSON.stringify(
        await meResponse.json(),
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
      await meResponse.json(),
    ),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};
