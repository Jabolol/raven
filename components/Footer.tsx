import IconBrandDeno from "icons/brand-deno.tsx";
import IconBrandGithub from "icons/brand-github.tsx";

export default function Footer() {
  return (
    <footer className="flex flex-col justify-center items-center py-6 text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800">
      <div className="flex flex-row items-center space-x-2 mb-4">
        <IconBrandDeno className="w-6 h-6" />
        <p className="text-sm font-medium">
          Powered by <a href="https://fresh.deno.dev/">Deno</a>
        </p>
      </div>
      <div className="flex flex-row items-center space-x-2 mb-4">
        <IconBrandGithub className="w-6 h-6" />
        <p className="text-sm font-medium">
          Open source at <a href="https://github.com/Jabolol/raven">GitHub</a>
        </p>
      </div>
      <div className="flex flex-row items-center space-x-4">
        <p className="text-sm font-medium">
          &copy; <a href="https://jabolo.deno.dev/">Javier R.</a>{" "}
          {new Date().getFullYear() === 2023
            ? "2023"
            : `2023 - ${new Date().getFullYear()}`}
        </p>
      </div>
    </footer>
  );
}
