import { computed, signal } from "@preact/signals";
import { type FriendResp } from "../types.ts";
import { getAuth, getSession, refresh } from "./auth.ts";

export const store = signal<FriendResp | null>(null);

export const isFriend = (s: FriendResp | null): s is FriendResp => s !== null;

export const user = computed(() => store.value);

export const fetchFriend = async (profile_id: string): Promise<void> => {
  getSession();
  const resp = await fetch("/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      profile_id,
      access_token: getAuth()?.access_token,
    }),
  });
  if (!resp.ok) {
    await refresh();
    return await fetchFriend(profile_id);
  }
  store.value = await resp.json();
};
