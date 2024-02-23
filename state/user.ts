import { computed, signal } from "@preact/signals";
import { type FriendResp } from "~/types.ts";
import { getSession, refresh } from "~/state/auth.ts";
import { execute } from "~/client.ts";

export const store = signal<FriendResp | null>(null);

export const isFriend = (s: FriendResp | null): s is FriendResp => s !== null;

export const user = computed(() => store.value);

export const fetchFriend = async (profile_id: string): Promise<void> => {
  const auth = await getSession();
  if (!auth) {
    return;
  }
  const result = await execute("user", { profile_id }, auth.access_token);
  if ("error" in result) {
    await refresh();
    return await fetchFriend(profile_id);
  }
  store.value = result.data;
};
