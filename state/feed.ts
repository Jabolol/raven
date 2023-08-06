import { computed, signal } from "@preact/signals";
import { type FeedResp } from "../types.ts";
import { getAuth, getSession, refresh } from "./auth.ts";

export const store = signal<FeedResp | null>(null);

export const isFeed = (s: FeedResp | null): s is FeedResp => s !== null;

export const feed = computed(() => store.value);

export const fetchFeed = async (): Promise<void> => {
  getSession();
  const resp = await fetch("/api/feed", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      access_token: getAuth()?.access_token,
    }),
  });
  if (!resp.ok) {
    await refresh();
    return await fetchFeed();
  }
  store.value = await resp.json();
};
