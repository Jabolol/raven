import { computed, signal } from "@preact/signals";
import { type FeedResp } from "~/types.ts";
import { getSession, refresh } from "~/state/auth.ts";
import { execute } from "~/client.ts";

export const store = signal<FeedResp | null>(null);

export const isFeed = (s: FeedResp | null): s is FeedResp => s !== null;

export const feed = computed(() => store.value);

export const fetchFeed = async (): Promise<void> => {
  const auth = await getSession();
  if (!auth) {
    return;
  }
  const result = await execute("feed", {}, auth.access_token);
  if ("error" in result) {
    await refresh();
    return await fetchFeed();
  }
  store.value = result.data;
};
