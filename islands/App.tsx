import Feed from "../islands/Feed.tsx";
import Login from "../islands/Login.tsx";
import Navbar from "../islands/Navbar.tsx";

import { useEffect, useState } from "preact/hooks";

import { store } from "../state/auth.ts";

export default function App() {
  const [isLogged, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    store.subscribe((v) => {
      setIsLoggedIn(v.loggedIn);
    });
  }, []);

  return (
    <main class="bg-white dark:bg-gray-800">
      <Navbar isLogged={isLogged} />
      {isLogged ? <Feed /> : <Login />}
    </main>
  );
}
