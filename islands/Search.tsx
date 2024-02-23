import { getSession } from "~/state/auth.ts";
import { useEffect, useState } from "preact/hooks";
import { execute } from "~/client.ts";

export default function Search() {
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    if (username.length < 3) return;
    (async () => {
      const session = await getSession();
      if (!session) return;
      const data = await execute(
        "search",
        { query: username },
        session.access_token,
      );
      console.log(data);
    })();
  }, [username]);

  return (
    <div className="h-[70vh]">
      <div className="mx-6 max-w-sm my-4 p-4 dark:bg-gray-800 border-2 border-gray-800 dark:border-white rounded-md opacity-50">
        <input
          type="text"
          disabled
          className="w-full focus:outline-none bg-transparent text-gray-800 dark:text-white cursor-not-allowed opacity-50"
          placeholder="username"
          onInput={(e) => setUsername((e.target as HTMLInputElement).value)}
        />
      </div>
    </div>
  );
}
