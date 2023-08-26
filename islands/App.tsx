import { useEffect, useState } from "preact/hooks";
import Feed from "~/islands/Feed.tsx";
import Login from "~/islands/Login.tsx";
import { isLoggedIn, store } from "~/state/auth.ts";

export default function App() {
  const [showFeed, setShowFeed] = useState<boolean>(false);
  useEffect(() => {
    store.subscribe((v) => {
      setShowFeed(v.loggedIn);
    });
    setShowFeed(isLoggedIn.value);
  }, []);

  return (
    showFeed ? <Feed /> : <Login />
  );
}
