import IconBrandDeno from "icons/brand-deno.tsx";
import IconBrandGithub from "icons/brand-github.tsx";

export default function Footer() {
  return (
    <footer class="flex flex-col justify-center items-center py-6 text-gray-600 dark:text-gray-400">
      <div class="flex flex-row items-center space-x-2 mb-4">
        <IconBrandDeno class="w-6 h-6" />
        <p class="text-sm font-medium">
          Powered by <a href="https://fresh.deno.dev/">Deno</a>
        </p>
      </div>
      <div class="flex flex-row items-center space-x-2 mb-4">
        <IconBrandGithub class="w-6 h-6" />
        <p class="text-sm font-medium">
          Open source at <a href="https://github.com/Jabolol/raven">GitHub</a>
        </p>
      </div>
      <div class="flex flex-row items-center space-x-4">
        <p class="text-sm font-medium">
          &copy; <a href="https://jabolo.deno.dev/">Javier R.</a>{" "}
          {new Date().getFullYear() === 2023
            ? "2023"
            : `2023 - ${new Date().getFullYear()}`}
        </p>
      </div>
    </footer>
  );
}
