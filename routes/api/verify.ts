import { HandlerContext } from "$fresh/server.ts";

export const handler = async (
  req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  if (req.method !== "POST") {
    return new Response(null, { status: 405 });
  }

  const { code, sessionInfo } = await req.json() as {
    code?: string;
    sessionInfo?: string;
  };

  if (!code || !sessionInfo) {
    return new Response(null, { status: 400 });
  }

  const fireResponse = await fetch(
    "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPhoneNumber?key=AIzaSyDwjfEeparokD7sXPVQli9NsTuhT6fJ6iA",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-firebase-client":
          "apple-platform/ios apple-sdk/19F64 appstore/true deploy/cocoapods device/iPhone9,1 fire-abt/8.15.0 fire-analytics/8.15.0 fire-auth/8.15.0 fire-db/8.15.0 fire-dl/8.15.0 fire-fcm/8.15.0 fire-fiam/8.15.0 fire-fst/8.15.0 fire-fun/8.15.0 fire-install/8.15.0 fire-ios/8.15.0 fire-perf/8.15.0 fire-rc/8.15.0 fire-str/8.15.0 firebase-crashlytics/8.15.0 os-version/14.7.1 xcode/13F100",
        "accept": "*/*",
        "x-client-version": "iOS/FirebaseSDK/8.15.0/FirebaseCore-iOS",
        "x-firebase-client-log-type": "0",
        "x-ios-bundle-identifier": "AlexisBarreyat.BeReal",
        "accept-language": "en",
        "user-agent":
          "FirebaseAuth.iOS/8.15.0 AlexisBarreyat.BeReal/0.22.4 iPhone/14.7.1 hw/iPhone9_1",
        "x-firebase-locale": "en",
      },
      body: JSON.stringify({
        code,
        sessionInfo,
        operation: "SIGN_UP_OR_IN",
      }),
    },
  );

  const { refreshToken, isNewUser, localId } = await fireResponse.json() as {
    refreshToken?: string;
    isNewUser?: boolean;
    localId?: string;
  };

  if (!refreshToken || !localId) {
    return new Response(null, { status: 400 });
  }

  const tokenResponse = await fetch(
    "https://securetoken.googleapis.com/v1/token?key=AIzaSyDwjfEeparokD7sXPVQli9NsTuhT6fJ6iA",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accept": "*/*",
        "x-client-version": "iOS/FirebaseSDK/8.15.0/FirebaseCore-iOS",
        "x-firebase-client-log-type": "0",
        "x-ios-bundle-identifier": "AlexisBarreyat.BeReal",
        "accept-language": "en",
        "user-agent":
          "FirebaseAuth.iOS/8.15.0 AlexisBarreyat.BeReal/0.22.4 iPhone/14.7.1 hw/iPhone9_1",
        "x-firebase-locale": "en",
      },
      body: JSON.stringify({
        refreshToken,
        grantType: "refresh_token",
      }),
    },
  );

  const { id_token: idToken } = await tokenResponse.json() as {
    id_token?: string;
  };

  if (!idToken) {
    return new Response(null, { status: 400 });
  }

  const grantResponse = await fetch(
    "https://auth.bereal.team/token?grant_type=firebase",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accept": "*/*",
        "x-client-version": "iOS/FirebaseSDK/8.15.0/FirebaseCore-iOS",
        "x-firebase-client-log-type": "0",
        "x-ios-bundle-identifier": "AlexisBarreyat.BeReal",
        "accept-language": "en",
        "user-agent":
          "FirebaseAuth.iOS/8.15.0 AlexisBarreyat.BeReal/0.22.4 iPhone/14.7.1 hw/iPhone9_1",
        "x-firebase-locale": "en",
      },
      body: JSON.stringify({
        grant_type: "firebase",
        client_id: "ios",
        client_secret: "962D357B-B134-4AB6-8F53-BEA2B7255420",
        token: idToken,
      }),
    },
  );

  const { access_token, refresh_token, token_type, expires_in } =
    await grantResponse.json() as {
      access_token?: string;
      refresh_token?: string;
      token_type?: string;
      expires_in?: number;
    };

  if (!access_token || !refresh_token || !token_type || !expires_in) {
    return new Response(null, { status: 400 });
  }

  return new Response(
    JSON.stringify({
      access_token,
      refresh_token,
      token_type,
      expiration: expires_in * 1000,
      uid: localId,
      is_new_user: isNewUser,
    }),
    {
      headers: {
        "content-type": "application/json",
      },
    },
  );
};
