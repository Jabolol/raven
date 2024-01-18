import { FreshContext } from "$fresh/server.ts";
import { FeedResp } from "~/types.ts";

export const handler = async (
  req: Request,
  _ctx: FreshContext,
): Promise<Response> => {
  if (req.method !== "POST") {
    return new Response(null, { status: 405 });
  }

  const { access_token, emoji, user_id } = await req.json() as {
    access_token?: string;
    emoji?: string;
    user_id?: string;
  };

  if (!access_token || !emoji) {
    return new Response(null, { status: 400 });
  }

  const initialFeedResponse = await fetch(
    "https://mobile.bereal.com/api/feeds/friends-v1",
    {
      headers: {
        authorization: `Bearer ${access_token}`,
        "bereal-app-version-code": "14549",
        "bereal-signature": "berealsignature",
        "bereal-device-id": "berealdeviceid",
      },
    },
  );

  if (!initialFeedResponse.ok) {
    return new Response(
      JSON.stringify(
        await initialFeedResponse.json(),
      ),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  const feed: FeedResp = await initialFeedResponse.json() as FeedResp;

  feed.friendsPosts.reduce(async (prms, batch) => {
    await prms;
    await batch.posts.filter((post) =>
      post.realMojis.some((reaction) => reaction.user.id !== user_id)
    ).reduce(async (prms, post) => {
      await prms;
      await fetch(
        `https://mobile.bereal.com/api/content/realmojis?postId=${post.id}&postUserId=${batch.user.id}`,
        {
          headers: {
            authorization: `Bearer ${access_token}`,
            "bereal-app-version-code": "14549",
            "bereal-signature": "berealsignature",
            "bereal-device-id": "berealdeviceid",
            "content-type": "application/json",
            "accept": "application/json",
          },
          method: "PUT",
          body: JSON.stringify({ emoji: `${emoji}` }),
        },
      );
      await new Promise((resolve) => setTimeout(resolve, 300));
    }, Promise.resolve());
  }, Promise.resolve());

  return new Response(
    JSON.stringify(
      { success: true },
    ),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};
