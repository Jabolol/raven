import { FreshContext } from "$fresh/server.ts";

export const handler = async (
  req: Request,
  _ctx: FreshContext,
): Promise<Response> => {
  if (req.method !== "POST") {
    return new Response(null, { status: 405 });
  }

  const { phoneNumber, retry } = await req.json() as {
    phoneNumber?: string;
    retry?: boolean;
  };

  if (!phoneNumber) {
    return new Response(null, { status: 400 });
  }

  if (retry) {
    const retryResponse = await fetch(
      "https://auth.bereal.team/api/vonage/request-code",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "user-agent": "BeReal/7242 CFNetwork/1333.0.4 Darwin/21.5.0",
          "accept-language": "es-ES,es;q=0.9",
        },
        body: JSON.stringify({
          phoneNumber,
          deviceId: "ntbgbuk8ly5gjvv3",
        }),
      },
    );

    if (!retryResponse.ok) {
      return new Response(
        JSON.stringify(
          await retryResponse.json(),
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
        await retryResponse.json(),
      ),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  const receiptResponse = await fetch(
    "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyClient?key=AIzaSyDwjfEeparokD7sXPVQli9NsTuhT6fJ6iA",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accept": "*/*",
        "x-client-version": "iOS/FirebaseSDK/9.6.0/FirebaseCore-iOS",
        "x-ios-bundle-identifier": "AlexisBarreyat.BeReal",
        "accept-language": "en",
        "user-agent":
          "FirebaseAuth.iOS/9.6.0 AlexisBarreyat.BeReal/0.31.0 iPhone/14.7.1 hw/iPhone9_1",
        "x-firebase-locale": "en",
        "x-firebase-gmpid": "1:405768487586:ios:28c4df089ca92b89",
      },
      body: JSON.stringify({
        appToken:
          "54F80A258C35A916B38A3AD83CA5DDD48A44BFE2461F90831E0F97EBA4BB2EC7",
      }),
    },
  );

  if (!receiptResponse.ok) {
    return new Response(
      JSON.stringify(
        await receiptResponse.json(),
      ),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  const { receipt } = await receiptResponse.json() as {
    receipt: string;
  };

  const otpResponse = await fetch(
    "https://www.googleapis.com/identitytoolkit/v3/relyingparty/sendVerificationCode?key=AIzaSyDwjfEeparokD7sXPVQli9NsTuhT6fJ6iA",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accept": "*/*",
        "x-client-version": "iOS/FirebaseSDK/9.6.0/FirebaseCore-iOS",
        "x-ios-bundle-identifier": "AlexisBarreyat.BeReal",
        "accept-language": "en",
        "user-agent":
          "FirebaseAuth.iOS/9.6.0 AlexisBarreyat.BeReal/0.31.0 iPhone/14.7.1 hw/iPhone9_1",
        "x-firebase-locale": "en",
        "x-firebase-gmpid": "1:405768487586:ios:28c4df089ca92b89",
      },
      body: JSON.stringify({
        phoneNumber: phoneNumber,
        iosReceipt: receipt,
      }),
    },
  );

  if (!otpResponse.ok) {
    return new Response(
      JSON.stringify(
        await otpResponse.json(),
      ),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  const { sessionInfo } = await otpResponse.json() as {
    sessionInfo: string;
  };

  return new Response(
    JSON.stringify({ sessionInfo }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};
