import { useEffect, useState } from "preact/hooks";
import { isLoggedIn, store } from "../state/auth.ts";
import { fetchFriend } from "../state/user.ts";
import Navbar from "./Navbar.tsx";
import User from "./User.tsx";
import Footer from "../components/Footer.tsx";

export default function Info({ id }: { id: string }) {
  const [isLogged, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoggedIn.value) window.location.href = "/";
    store.subscribe((v) => {
      setIsLoggedIn(v.loggedIn);
    });
    setIsLoggedIn(isLoggedIn.value);
    fetchFriend(id);
  }, []);

  return (
    <main class="bg-white dark:bg-gray-800">
      <Navbar isLogged={isLogged} />
      <User id={id} />
      <Footer />
    </main>
  );
}
