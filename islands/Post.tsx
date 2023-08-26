import { useState } from "preact/hooks";
import { type FriendEntry } from "~/types.ts";
import IconEye from "icons/eye.tsx";
import IconEyeOff from "icons/eye-off.tsx";
import Comment from "~/islands/Comments.tsx";

export default function Post(
  { user, region, posts }: {
    user: FriendEntry["user"];
    region: FriendEntry["region"];
    posts: FriendEntry["posts"];
  },
) {
  const [showStates, setShowStates] = useState(
    posts.reduce<
      Record<string, { showSecondaryMap: boolean; showPreview: boolean }>
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
          className="m-4 mx-auto max-w-sm p-4 dark:bg-gray-800 border-2 border-gray-800 dark:border-white rounded-md"
        >
          <div className="flex items-center">
            <a href={`/user/${user.id}`}>
              <img
                src={(user.profilePicture ?? { url: "/raven.png" }).url}
                alt={user.username}
                className="w-10 h-10 rounded-full mr-2"
                onError={(d) => {
                  (d.target as HTMLImageElement).src = "/raven.png";
                }}
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
                onError={(d) => {
                  (d.target as HTMLImageElement).src = "/raven.png";
                }}
              />
              {showStates[post.id].showSecondaryMap && (
                <img
                  src={post.secondary.url}
                  alt={`Frontal ${post.id}`}
                  className="absolute inset-0 w-full h-full rounded-lg shadow cursor-pointer"
                  onClick={() => toggleState(post.id, "showSecondaryMap")}
                  onError={(d) => {
                    (d.target as HTMLImageElement).src = "/raven.png";
                  }}
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
                onError={(d) => {
                  (d.target as HTMLImageElement).src = "/raven.png";
                }}
              />
            </div>
          </div>
          {post.realMojis.length > 0 && (
            <div class="overflow-x-auto flex w-max-md w-full gap-2 py-2">
              {post.realMojis.map((realMoji) => (
                <div class="flex-none pt-2">
                  <div class="relative flex flex-col items-center justify-center gap-x-3">
                    <a href={`/user/${realMoji.user.id}`}>
                      <img
                        class="w-16 h-16 rounded-full"
                        src={realMoji.media.url}
                        alt="realMoji"
                        onError={(d) => {
                          (d.target as HTMLImageElement).classList.add(
                            "hidden",
                          );
                        }}
                      />
                    </a>
                    <p class="absolute bottom-0 right-0">{realMoji.emoji}</p>
                  </div>
                  <p class="text-gray-800 dark:text-white text-xs font-medium text-center">
                    @{realMoji.user.username.length > 10 ? realMoji.user.username.slice(0, 7) + "..." : realMoji.user.username}
                  </p>
                </div>
              ))}
            </div>
          )}
          <p className="mt-2 text-sm dark:text-white">{post.caption}</p>
          <Comment {...post} />
        </div>
      ))}
    </>
  );
}
