import { computed, signal } from "@preact/signals";
import { type AppState, type Auth, type JWTPayload } from "~/types.ts";

export const store = signal<AppState>({
  loggedIn: false,
});

export const isLoggedIn = computed(() => {
  const auth = localStorage.getItem("auth");
  if (!auth) {
    return false;
  }
  store.value = {
    loggedIn: true,
    auth: JSON.parse(auth),
  };
  return true;
});

export const login = (auth: Auth) => {
  store.value = {
    loggedIn: true,
    auth,
  };
  localStorage.setItem("auth", JSON.stringify(auth));
};

export const refresh = async () => {
  if (!store.value.loggedIn) {
    return;
  }
  const req = await fetch("/api/refresh", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      refreshToken: store.value.auth.refresh_token,
    }),
  });
  if (!req.ok) {
    return logout();
  }
  const { access_token, refresh_token, expires_in } = await req.json() as {
    access_token?: string;
    refresh_token?: string;
    expires_in?: number;
  };
  if (!access_token || !refresh_token || !expires_in) {
    return logout();
  }
  login({
    ...store.value.auth,
    access_token,
    refresh_token,
    expiration: expires_in * 1000,
  });
};

export const getAuth = () => {
  if (!store.value.loggedIn) {
    return null;
  }
  return store.value.auth;
};

export const getSession = async (): Promise<Auth | null> => {
  const data = localStorage.getItem("auth");
  if (store.value.loggedIn) {
    const expired = isExpired(parseJwt(store.value.auth.access_token));
    if (expired) {
      await refresh();
    }
    return store.value.auth;
  }
  if (!data) {
    return null;
  }
  const auth = JSON.parse(data);
  const expired = isExpired(parseJwt(auth.access_token));
  if (expired) {
    await refresh();
  } else {
    login(auth);
    return auth;
  }
  return await getSession();
};

export const logout = () => {
  store.value = {
    loggedIn: false,
  };
  localStorage.removeItem("auth");
};

export const parseJwt = (token: string): JWTPayload =>
  JSON.parse(
    decodeURIComponent(
      atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
        .split("").map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(""),
    ),
  );

export const isExpired = (payload: JWTPayload) =>
  payload.exp <= Math.floor(Date.now() / 1000);
