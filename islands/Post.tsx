import { useState } from "preact/hooks";
import { type FeedResp } from "../types.ts";

import IconEye from "icons/eye.tsx";
import IconEyeOff from "icons/eye-off.tsx";

import Comment from "./Comments.tsx";

export default function Post({
  user,
  region,
  posts,
}: FeedResp["friendsPosts"][number]) {
  const [showStates, setShowStates] = useState(
    posts.reduce<
      { [k: string]: { showSecondaryMap: boolean; showPreview: boolean } }
    >((acc, post) => {
      acc[post.id] = {
        showSecondaryMap: false,
        showPreview: true,
      };
      return acc;
    }, {}),
  );

  const toggleState = (
    postId: string,
    key: "showSecondaryMap" | "showPreview",
  ) => {
    setShowStates((prevStates) => ({
      ...prevStates,
      [postId]: {
        ...prevStates[postId],
        [key]: !prevStates[postId][key],
      },
    }));
  };

  return (
    <>
      {posts.map((post) => (
        <div
          id={post.id}
          key={post.id}
          className="m-4 mx-auto max-w-md p-4 dark:bg-gray-800 border-2 border-gray-800 dark:border-white rounded-md"
        >
          <div className="flex items-center">
            <a href={`/user/${user.id}`}>
              <img
                src={(user.profilePicture ?? { url: "/raven.png" }).url}
                alt={user.username}
                className="w-10 h-10 rounded-full mr-2"
              />
            </a>
            <div>
              <a href={`/user/${user.id}`}>
                <p className="text-sm font-semibold dark:text-white">
                  @{user.username}
                </p>
              </a>
              <p className="text-xs text-gray-500 dark:text-gray-300">
                {region} -{" "}
                {new Date(post.takenAt).toLocaleTimeString(undefined, {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </p>
            </div>
            <div
              className={`cursor-pointer ml-auto dark:text-white text-black`}
              onClick={() => toggleState(post.id, "showPreview")}
            >
              {showStates[post.id].showPreview
                ? <IconEyeOff className="w-6 h-6" />
                : <IconEye className="w-6 h-6" />}
            </div>
          </div>
          <div className="mt-4 relative">
            <div className="relative">
              <img
                src={post.primary.url}
                alt={`Post ${post.id}`}
                className="w-full rounded-lg shadow cursor-pointer"
                onClick={() => toggleState(post.id, "showSecondaryMap")}
              />
              {showStates[post.id].showSecondaryMap && (
                <img
                  src={post.secondary.url}
                  alt={`Frontal ${post.id}`}
                  className="absolute inset-0 w-full h-full rounded-lg shadow cursor-pointer"
                  onClick={() => toggleState(post.id, "showSecondaryMap")}
                />
              )}
            </div>
            <div
              className={`${
                !showStates[post.id].showPreview && "hidden"
              } absolute top-4 left-4 w-32 h-48 bg-white bg-opacity-75 rounded-lg cursor-pointer`}
              onClick={() => toggleState(post.id, "showSecondaryMap")}
            >
              <img
                src={showStates[post.id].showSecondaryMap
                  ? post.primary.url
                  : post.secondary.url}
                alt={`Frontal ${post.id}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
          <p className="mt-2 text-sm dark:text-white">{post.caption}</p>
          <Comment {...post} />
        </div>
      ))}
    </>
  );
}
