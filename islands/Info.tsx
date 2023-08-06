import { useEffect } from "preact/hooks";
import { fetchFriend } from "../state/user.ts";
import { isLoggedIn } from "../state/auth.ts";
import Navbar from "./Navbar.tsx";
import User from "./User.tsx";

export default function Info({ id }: { id: string }) {
  useEffect(() => {
    if (!isLoggedIn.value) window.location.href = "/";
    fetchFriend(id);
  }, []);
  return (
    <main class="bg-white dark:bg-gray-800">
      <Navbar isLogged={isLoggedIn.value} />
      <User id={id} />
    </main>
  );
}
