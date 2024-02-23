import { z } from "zod";
import { type ApiFunction, type APIMap, type ApiValidators } from "~/types.ts";

export const headers = (_templates: TemplateStringsArray, token: string) => ({
  "Bereal-Platform": "android",
  "Bereal-App-Language": "en-US",
  "Bereal-Device-Language": "en-US",
  "Bereal-App-Version": "1.19.6",
  "Bereal-Os-Version": "10",
  "Bereal-Device-Id": "7ee4e0f891cca704",
  "Bereal-Timezone": "Europe/Madrid",
  "Bereal-App-Version-Code": "1631",
  "Bereal-Signature":
    "MToxNzA2MDMzNzU0ODg2Oup7dtgGFyaMYEr29QlXEJt44RxF6dBBpN+PpYPz+7Zn",
  "Authorization": `Bearer ${token}`,
  "User-Agent": "okhttp/4.12.0",
});

export const validators: ApiValidators = {
  search: z.object({
    query: z.string(),
  }),
  feed: z.object({}),
  add: z.object({
    userId: z.string(),
    source: z.literal("search"),
  }),
  friends: z.object({}),
  me: z.object({}),
  react: z.object({
    postId: z.string(),
    emoji: z.string(),
    postUserId: z.string(),
  }),
  refresh: z.object({
    refreshToken: z.string(),
  }),
  user: z.object({
    profile_id: z.string(),
  }),
};

const generic = async (url: string, token: string, body?: unknown) => {
  const result = await fetch(
    url,
    {
      method: body ? "POST" : "GET",
      headers: headers`${token}`,
      body: body ? JSON.stringify(body) : undefined,
    },
  );
  if (!result.ok) {
    return { error: `(${result.status}) failed to fetch \`${result.url}\`` };
  }
  return { data: await result.json() };
};

const map: ApiFunction = {
  search: ({ query }, token) =>
    generic(
      `https://mobile.bereal.com/api/search/profile?query=${query}&limit=20`,
      token,
    ),
  feed: (_none, token) =>
    generic(
      `https://mobile.bereal.com/api/feeds/friends-v1`,
      token,
    ),
  add: (body, token) =>
    generic(
      `https://mobile.bereal.com/api/relationships/friend-requests`,
      token,
      body,
    ),
  friends: (_none, token) =>
    generic(
      `https://mobile.bereal.com/api/relationships/friends`,
      token,
    ),
  me: (_none, token) =>
    generic(
      `https://mobile.bereal.com/api/person/me`,
      token,
    ),
  react: ({ emoji, postId, postUserId }, token) =>
    generic(
      `https://mobile.bereal.com/api/content/realmojis?postId=${postId}&postUserId=${postUserId}`,
      token,
      { emoji },
    ),
  refresh: ({ refreshToken: refresh_token }, token) =>
    generic(
      `https://mobile.bereal.com/api/auth/refresh`,
      token,
      {
        grant_type: "refresh_token",
        client_id: "ios",
        client_secret: "962D357B-B134-4AB6-8F53-BEA2B7255420",
        refresh_token,
      },
    ),
  user: ({ profile_id }, token) =>
    generic(
      `https://mobile.bereal.com/api/person/profiles/${profile_id}`,
      token,
    ),
};

export const perform = async <T extends keyof APIMap>(
  key: T,
  data: APIMap[T]["in"],
  token: string,
): Promise<APIMap[T]["out"]> => {
  const valid = validators[key].safeParse(data);
  if (!valid.success) {
    return { error: valid.error.message };
  }
  return await map[key](data, token);
};

export const execute = async <T extends keyof APIMap>(
  key: T,
  data: APIMap[T]["in"],
  token: string,
): Promise<APIMap[T]["out"]> => {
  const request = await fetch(`/api/execute`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ key, data }),
  });
  if (!request.ok) {
    return { error: `(${request.status}) failed to fetch \`${request.url}\`` };
  }
  return await request.json();
};
