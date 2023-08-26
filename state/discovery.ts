import { computed, signal } from "@preact/signals";
import { type DiscoveryResp } from "~/types.ts";
import { getSession, refresh } from "~/state/auth.ts";

export const store = signal<DiscoveryResp | null>(null);

export const isDiscovery = (s: DiscoveryResp | null): s is DiscoveryResp =>
  s !== null;

export const discovery = computed(() => store.value);

export const fetchDiscovery = async (): Promise<void> => {
  const auth = await getSession();
  if (!auth) {
    return;
  }
  const resp = await fetch("/api/discovery", {
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
    return await fetchDiscovery();
  }
  store.value = await resp.json();
};
