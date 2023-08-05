import { useState } from "preact/hooks";
import { FeedResp } from "../types.ts";

export default function Post(
  { user, region, posts: [post] }: FeedResp["friendsPosts"][number],
) {
  const [showSecondary, setShowSecondary] = useState(false);

  const toggleSecondary = () => {
    setShowSecondary((x) => !x);
  };

  return (
    <div className="p-4 dark:bg-gray-800">
      <div className="flex items-center">
        <img
          src={user.profilePicture.url}
          alt={user.username}
          className="w-10 h-10 rounded-full mr-2"
        />
        <div>
          <p className="text-sm font-semibold dark:text-white">
            {user.username}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-300">{region}</p>
        </div>
      </div>
      <div className="mt-4 relative">
        <img
          src={post.primary.url}
          alt={`Post ${post.id}`}
          className="w-full rounded-lg shadow"
        />
        {showSecondary && (
          <img
            src={post.secondary.url}
            alt={`Frontal ${post.id}`}
            className="absolute inset-0 w-full h-full rounded-lg shadow cursor-pointer"
            onClick={toggleSecondary}
          />
        )}
        {!showSecondary && (
          <div
            className="absolute inset-0 w-full h-full rounded-lg shadow cursor-pointer"
            onClick={toggleSecondary}
          >
          </div>
        )}
        <div className="mt-2 text-sm dark:text-white">{post.caption}</div>
      </div>
    </div>
  );
}
