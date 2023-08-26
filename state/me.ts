import { computed, signal } from "@preact/signals";
import { type MeResp } from "~/types.ts";
import { getSession, refresh } from "~/state/auth.ts";

export const store = signal<MeResp | null>(null);

export const isMe = (s: MeResp | null): s is MeResp => s !== null;

export const me = computed(() => store.value);

export const fetchMe = async (): Promise<void> => {
  const auth = await getSession();
  if (!auth) {
    return;
  }
  const resp = await fetch("/api/me", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      access_token: auth.access_token,
    }),
  });
  if (!resp.ok) {
    await refresh();
    return await fetchMe();
  }
  store.value = await resp.json();
};
