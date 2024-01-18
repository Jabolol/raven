import { FreshContext } from "$fresh/server.ts";

export const handler = async (
  req: Request,
  _ctx: FreshContext,
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
        "bereal-app-version-code": "14549",
        "bereal-signature": "berealsignature",
        "bereal-device-id": "berealdeviceid",
      },
    },
  );

  if (!friendResponse.ok) {
    return new Response(
      JSON.stringify(
        await friendResponse.json(),
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
      await friendResponse.json(),
    ),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};
