import { computed, signal } from "@preact/signals";
import { type MeResp } from "../types.ts";
import { getAuth, refresh } from "./auth.ts";

export const store = signal<MeResp | null>(null);

export const isMe = (s: MeResp | null): s is MeResp => s !== null;

export const me = computed(() => store.value);

export const fetchMe = async (): Promise<void> => {
  const resp = await fetch("/api/me", {
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
    return await fetchMe();
  }
  store.value = await resp.json();
};
