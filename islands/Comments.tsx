import { useState } from "preact/hooks";
import { type Posts } from "~/types.ts";
import IconArrowUp from "icons/arrow-up.tsx";
import IconArrowDown from "icons/arrow-down.tsx";

export default function Comment({ comments }: Posts) {
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  if (!comments.length) {
    return (
      <p className="text-sm dark:text-gray-400 text-gray-600 mt-2">
        No comments
      </p>
    );
  }

  return (
    <div className="mt-4">
      <button
        className="text-sm font-bold cursor-pointer flex items-center dark:text-white text-dark-800"
        onClick={() => setShowDrawer((x) => !x)}
      >
        {showDrawer ? "Hide Comments" : "Show Comments"}
        {showDrawer
          ? <IconArrowUp className="ml-1 w-4 h-4" />
          : <IconArrowDown className="ml-1 w-4 h-4" />}
      </button>
      {showDrawer && (
        <div className="mt-2 p-2 border rounded-md border-gray-800 dark:border-white">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="flex items-center px-2"
            >
              <p className="text-sm dark:text-white text-dark-800">
                <a href={`/user/${comment.user.id}`} className="font-bold">
                  {comment.user.username}:
                </a>{" "}
                {comment.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
