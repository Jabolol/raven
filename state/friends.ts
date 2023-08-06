import { computed, signal } from "@preact/signals";
import { type FriendList } from "../types.ts";
import { getAuth, refresh } from "./auth.ts";

export const store = signal<FriendList | null>(null);

export const isFriends = (s: FriendList | null): s is FriendList => s !== null;

export const friends = computed(() => store.value);

export const fetchFriends = async (): Promise<void> => {
  const resp = await fetch("/api/friends", {
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
    return await fetchFriends();
  }
  store.value = await resp.json();
};
