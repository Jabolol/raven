import { z } from "zod";
import getHeaders from "happy-headers";
import { type ApiFunction, type APIMap, type ApiValidators } from "~/types.ts";

export const headers = (_templates: TemplateStringsArray, token: string) => ({
  "Authorization": `Bearer ${token}`,
  ...getHeaders(),
});

const refresh = () => ({
  "Accept": "*/*",
  "User-Agent": `BeReal/8586 CFNetwork/1240.0.4 Darwin/20.6.0`,
  "x-ios-bundle-identifier": "AlexisBarreyat.BeReal",
  "Content-Type": "application/json",
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
      headers: {
        ...headers`${token}`,
        ...url.includes("refresh_token") ? refresh() : {},
      },
      body: body ? JSON.stringify(body) : undefined,
    },
  );
  if (!result.ok) {
    return {
      error: {
        message: `(${result.status}) failed to fetch \`${result.url}\``,
        data: await result.text(),
      },
    };
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
      `https://auth.bereal.team/token?grant_type=refresh_token`,
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
    return {
      error: {
        message: `(${request.status}) failed to fetch \`${request.url}\``,
        data: await request.text(),
      },
    };
  }
  return await request.json();
};
