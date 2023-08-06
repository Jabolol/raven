import { useEffect, useState } from "preact/hooks";
import IconMoon from "icons/moon.tsx";
import IconSun from "icons/sun.tsx";
import IconBrandGithub from "icons/brand-github.tsx";
import IconLogout from "icons/logout.tsx";
import IconReload from "icons/reload.tsx";
import IconArrowBigLeft from "icons/arrow-big-left.tsx";
import { logout } from "../state/auth.ts";

export default function Navbar({ isLogged }: { isLogged: boolean }) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    setIsDarkMode(document.body.classList.contains("dark"));
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevDarkMode) => !prevDarkMode);
    document.body.classList.toggle("dark");
  };

  return (
    <header>
      <nav
        className={`flex justify-between bg-white dark:bg-gray-800 text-black dark:text-white ${
          isDarkMode ? "dark" : ""
        }`}
      >
        <a href="/">
          <div className="flex items-center justify-center p-5 gap-3">
            <h1 className="text-lg font-semibold">Raven</h1>
          </div>
        </a>
        <div className="flex items-center justify-center p-5 gap-3">
          <IconArrowBigLeft
            onClick={() => history.back()}
            className="cursor-pointer"
          />
          <IconReload
            onClick={() => location.reload()}
            className="cursor-pointer"
          />
          {isDarkMode
            ? <IconSun onClick={toggleDarkMode} className="cursor-pointer" />
            : <IconMoon onClick={toggleDarkMode} className="cursor-pointer" />}
          {isLogged
            ? (
              <img
                src="/logo.svg"
                alt="raven logo"
                className={`w-8 h-8 rounded-full cursor-pointer`}
              />
            )
            : (
              <a
                href="https://github.com/Jabolol/raven"
                className="cursor-pointer"
              >
                <IconBrandGithub />
              </a>
            )}
          {isLogged && <IconLogout onClick={logout} />}
        </div>
      </nav>
    </header>
  );
}
