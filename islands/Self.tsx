import { useEffect, useState } from "preact/hooks";
import { isLoggedIn, store } from "../state/auth.ts";
import Navbar from "./Navbar.tsx";
import Me from "./Me.tsx";
import Footer from "../components/Footer.tsx";

export default function Self() {
  const [isLogged, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoggedIn.value) window.location.href = "/";
    store.subscribe((v) => {
      setIsLoggedIn(v.loggedIn);
    });
    setIsLoggedIn(isLoggedIn.value);
  }, []);

  return (
    <main class="bg-white dark:bg-gray-800">
      <Navbar isLogged={isLogged} />
      <Me />
      <Footer />
    </main>
  );
}
