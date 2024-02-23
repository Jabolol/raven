import { computed, signal } from "@preact/signals";
import { type FriendList } from "~/types.ts";
import { getSession, refresh } from "~/state/auth.ts";
import { execute } from "~/client.ts";

export const store = signal<FriendList | null>(null);

export const isFriends = (s: FriendList | null): s is FriendList => s !== null;

export const friends = computed(() => store.value);

export const fetchFriends = async (): Promise<void> => {
  const auth = await getSession();
  if (!auth) {
    return;
  }
  const result = await execute("friends", {}, auth.access_token);
  if ("error" in result) {
    await refresh();
    return await fetchFriends();
  }
  store.value = result.data;
};
