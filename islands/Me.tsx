import { useEffect, useState } from "preact/hooks";
import Spinner from "~/components/Spinner.tsx";
import { fetchMe, me } from "~/state/me.ts";
import { feed, fetchFeed } from "~/state/feed.ts";
import { fetchFriends, friends } from "~/state/friends.ts";
import Post from "~/islands/Post.tsx";
import IconArrowBigLeft from "icons/arrow-big-left.tsx";
import IconArrowBigRight from "icons/arrow-big-right.tsx";
import { type SelfPost } from "~/types.ts";

export default function Me() {
  const [index, setIndex] = useState<number>(0);
  const [post, setPost] = useState<SelfPost | null>(null);

  const user = me.value;
  const feedList = feed.value;
  const friendList = friends.value;

  useEffect(() => {
    (async () => await Promise.all([fetchMe(), fetchFeed(), fetchFriends()]))();
  }, []);

  useEffect(() => {
    if (feedList !== null && feedList.userPosts) {
      setPost(feedList.userPosts.posts[index]);
    }
  }, [index, feedList]);

  if (user === null || friendList === null || feedList === null) {
    return <Spinner />;
  }

  return (
    <div className="text-gray-800 bg-white dark:bg-gray-800 dark:text-white p-4 max-w-md min-h-screen mx-auto">
      <div className="relative">
        <img
          src={(user.profilePicture ?? { url: "/raven.png" }).url}
          alt="Profile"
          className="w-full h-auto rounded-lg"
          onError={(d) => {
            (d.target as HTMLImageElement).src = "/raven.png";
          }}
        />
      </div>
      <div className="mt-4">
        <h1 className="text-3xl font-bold mb-2">{user.fullname}</h1>
        <p className="text-lg mb-2">@{user.username}</p>
        <p className="text-lg mb-4">{user.biography}</p>
      </div>
      {feedList.userPosts && feedList.userPosts.posts.length > 0 && post && (
        <div class="bg-gray-100 dark:bg-gray-900 p-4 pb-8 mt-4 rounded-lg overflow-x-auto flex flex-col w-max-md w-full">
          <div class="flex justify-between">
            <h2 className="text-lg font-semibold mb-2">
              Posts ({feedList.userPosts.posts.length})
            </h2>
            <div class="flex gap-2">
              <IconArrowBigLeft
                class={`cursor-pointer ${
                  index === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => {
                  if (index > 0) {
                    setIndex((i) => i - 1);
                  }
                }}
              />
              <IconArrowBigRight
                class={`cursor-pointer ${
                  index === feedList.userPosts.posts.length - 1
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={() => {
                  if (index < feedList.userPosts!.posts.length - 1) {
                    setIndex((i) => i + 1);
                  }
                }}
              />
            </div>
          </div>
          <div>
            <Post
              user={feedList.userPosts.user}
              region={feedList.userPosts.region}
              posts={[post]}
            />
          </div>
        </div>
      )}
      {friendList.data.length > 0 && (
        <div className="bg-gray-100 dark:bg-gray-900 p-4 mt-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">
            Friends ({friendList.data.length})
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {friendList.data.map((friend) => (
              <a href={`/user/${friend.id}`} key={friend.id}>
                <div className="p-2 rounded-lg bg-white dark:bg-gray-800">
                  <img
                    src={(friend.profilePicture ?? { url: "/raven.png" }).url}
                    alt={friend.fullname}
                    className="w-full h-auto rounded-lg"
                    onError={(d) => {
                      (d.target as HTMLImageElement).src = "/raven.png";
                    }}
                  />
                  <p className="text-md mt-1">@{friend.username}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
      {user.realmojis.length > 0 && (
        <div className="bg-gray-100 dark:bg-gray-900 p-4 mt-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">
            Realmojis ({user.realmojis.length})
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {user.realmojis.map((
              realmoji,
            ) => (
              <div
                key={realmoji.id}
                className="p-2 rounded-lg bg-white dark:bg-gray-800"
              >
                <img
                  src={realmoji.media.url}
                  alt="Realmoji"
                  className="w-full h-auto rounded-lg"
                  onError={(d) => {
                    (d.target as HTMLImageElement).src = "/raven.png";
                  }}
                />
                <p className="text-md mt-1">{realmoji.emoji}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
