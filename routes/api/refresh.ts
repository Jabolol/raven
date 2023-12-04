import { FreshContext } from "$fresh/server.ts";

export const handler = async (
  req: Request,
  _ctx: FreshContext,
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
    "https://securetoken.googleapis.com/v1/token?key=AIzaSyDwjfEeparokD7sXPVQli9NsTuhT6fJ6iA",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-firebase-client":
          "apple-platform/ios apple-sdk/19F64 appstore/true deploy/cocoapods device/iPhone13,2 fire-abt/8.15.0 fire-analytics/8.15.0 fire-auth/8.15.0 fire-db/8.15.0 fire-dl/8.15.0 fire-fcm/8.15.0 fire-fiam/8.15.0 fire-fst/8.15.0 fire-fun/8.15.0 fire-install/8.15.0 fire-ios/8.15.0 fire-perf/8.15.0 fire-rc/8.15.0 fire-str/8.15.0 firebase-crashlytics/8.15.0 os-version/15.5 xcode/13F100",
        accept: "*/*",
        "x-client-version": "iOS/FirebaseSDK/8.15.0/FirebaseCore-iOS",
        "x-firebase-client-log-type": "0",
        "x-ios-bundle-identifier": "AlexisBarreyat.BeReal",
        "accept-language": "en",
        "user-agent":
          "FirebaseAuth.iOS/8.15.0 AlexisBarreyat.BeReal/0.22.4 iPhone/15.5 hw/iPhone13_2",
        "x-firebase-locale": "en",
      },
      body: JSON.stringify({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    },
  );

  if (!refreshResponse.ok) {
    return new Response(
      JSON.stringify(
        await refreshResponse.json(),
      ),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  const { id_token } = await refreshResponse.json() as { id_token?: string };

  const grantResponse = await fetch(
    "https://auth.bereal.team/token?grant_type=firebase",
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "user-agent": "BeReal/7242 CFNetwork/1333.0.4 Darwin/21.5.0",
        "accept-language": "en-US,en;q=0.9",
      },
      body: JSON.stringify({
        grant_type: "firebase",
        client_id: "android",
        client_secret: "F5A71DA-32C7-425C-A3E3-375B4DACA406",
        token: id_token,
      }),
    },
  );

  const { access_token, refresh_token, expires_in } = await grantResponse
    .json() as {
      access_token: string;
      refresh_token: string;
      expires_in: number;
    };

  return new Response(
    JSON.stringify({
      access_token,
      refresh_token,
      expires_in,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  // ------------------------------ //

  // const refreshResponse = await fetch(
  //   "https://auth.bereal.team/token?grant_type=refresh_token",
  //   {
  //     method: "POST",
  //     headers: {
  //       "Accept": "*/*",
  //       "User-Agent": "BeReal/8586 CFNetwork/1240.0.4 Darwin/20.6.0",
  //       "x-ios-bundle-identifier": "AlexisBarreyat.BeReal",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       grant_type: "refresh_token",
  //       client_id: "ios",
  //       client_secret: "962D357B-B134-4AB6-8F53-BEA2B7255420",
  //       refresh_token: refreshToken,
  //     }),
  //   },
  // );

  // if (!refreshResponse.ok) {
  //   return new Response(
  //     JSON.stringify(
  //       await refreshResponse.json(),
  //     ),
  //     {
  //       status: 400,
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     },
  //   );
  // }

  // const { access_token, refresh_token, expires_in } = await refreshResponse
  //   .json() as {
  //     access_token?: string;
  //     refresh_token?: string;
  //     expires_in?: number;
  //   };

  // return new Response(
  //   JSON.stringify({
  //     access_token,
  //     refresh_token,
  //     expires_in,
  //   }),
  //   {
  //     status: 200,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   },
  // );
};
