import { computed, signal } from "@preact/signals";
import { type MeResp } from "~/types.ts";
import { getSession, refresh } from "~/state/auth.ts";
import { execute } from "~/client.ts";

export const store = signal<MeResp | null>(null);

export const isMe = (s: MeResp | null): s is MeResp => s !== null;

export const me = computed(() => store.value);

export const fetchMe = async (): Promise<void> => {
  const auth = await getSession();
  if (!auth) {
    return;
  }
  const result = await execute("me", {}, auth.access_token);
  if ("error" in result) {
    await refresh();
    return await fetchMe();
  }
  store.value = result.data;
};
