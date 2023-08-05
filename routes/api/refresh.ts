import { HandlerContext } from "$fresh/server.ts";

export const handler = async (
  req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  if (req.method !== "POST") {
    return new Response(null, { status: 405 });
  }

  const { refreshToken } = await req.json() as {
    refreshToken?: string;
  };

  if (!refreshToken) {
    return new Response(null, { status: 400 });
  }

  const refreshResponse = await fetch(
    "https://auth.bereal.team/token?grant_type=refresh_token",
    {
      method: "POST",
      headers: {
        "Accept": "*/*",
        "User-Agent": "BeReal/8586 CFNetwork/1240.0.4 Darwin/20.6.0",
        "x-ios-bundle-identifier": "AlexisBarreyat.BeReal",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "refresh_token",
        client_id: "ios",
        client_secret: "962D357B-B134-4AB6-8F53-BEA2B7255420",
        refresh_token: refreshToken,
      }),
    },
  );

  const { access_token, refresh_token, expires_in } = await refreshResponse
    .json() as {
      access_token?: string;
      refresh_token?: string;
      expires_in?: number;
    };

  return new Response(
    JSON.stringify({
      access_token,
      refresh_token,
      expires_in,
    }),
    { status: 200, headers: { "content-type": "application/json" } },
  );
};
