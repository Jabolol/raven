import { useEffect, useState } from "preact/hooks";
import IconGitCommit from "icons/git-commit.tsx";
import IconGitMerge from "icons/git-merge.tsx";
import { type ChangeLogResponse } from "~/types.ts";
import Error from "~/islands/Error.tsx";

export default function Changelog() {
  const [commits, setCommits] = useState<ChangeLogResponse>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/changelog");
      if (!response.ok) {
        return setError(`${response.status} :: ${await response.text()}`);
      }
      setCommits(await response.json());
    })();
  }, []);

  return (
    <div className="max-w-[50%] flex items-center flex-col">
      <div className="mt-10">
        <h1 className="text-2xl font-semibold text-center dark:text-white">
          Changelog
        </h1>
      </div>
      {error ? <Error message={error} /> : (
        <>
          <div className="mt-5 flex items-center gap-2 mb-2">
            <p className="font-mono text-gray-800 bg-white border border-gray-300 rounded-md dark:text-white dark:bg-gray-700 dark:border-gray-600">
              {commits.length
                ? commits[commits.length - 1].sha.slice(0, 7)
                : "1bc2dd5"}
            </p>
            <IconGitMerge className="dark:text-white text-gray-800 w-6 h-6" />
            <p className="font-mono text-gray-800 bg-white border border-gray-300 rounded-md dark:text-white dark:bg-gray-700 dark:border-gray-600">
              {commits.length ? commits[0].sha.slice(0, 7) : "a89c3e1"}
            </p>
          </div>
          <div className="mt-2 flex text-center">
            <p className="text-gray-600 dark:text-gray-300">
              There are{" "}
              <span className="font-bold">
                {commits.length} commit{commits.length > 1 && "s"}
              </span>{" "}
              between deployments.
            </p>
          </div>
          <div className="mt-5 flex flex-col pb-4">
            {commits.map(({ sha, message, url }) => (
              <a href={url}>
                <div className="flex items-center bg-white dark:bg-gray-800 my-1">
                  <IconGitCommit className="dark:text-white text-gray-800 w-6 h-6" />
                  <p className="font-mono text-gray-800 bg-white border border-gray-300 rounded-md dark:text-white dark:bg-gray-700 dark:border-gray-600">
                    {sha.slice(0, 7)}
                  </p>
                  <p className="font-mono text-gray-600 dark:text-gray-300 ml-2">
                    {message.replaceAll(/\`/g, "")}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
