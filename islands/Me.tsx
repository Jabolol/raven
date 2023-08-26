import { useEffect } from "preact/hooks";
import Spinner from "~/components/Spinner.tsx";
import { fetchMe, me } from "~/state/me.ts";
import { fetchFriends, friends } from "~/state/friends.ts";

export default function Me() {
  useEffect(() => {
    fetchMe();
    fetchFriends();
  }, []);

  const user = me.value;
  const friendList = friends.value;

  if (user === null || friendList === null) {
    return <Spinner />;
  }

  return (
    <div className="text-gray-800 bg-white dark:bg-gray-800 dark:text-white p-4 max-w-md min-h-screen mx-auto">
      <div className="relative">
        <img
          src={(user.profilePicture ?? { url: "/raven.png" }).url}
          alt="Profile"
          className="w-full h-auto rounded-md"
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
      {friendList.data.length && (
        <div className="bg-gray-100 dark:bg-gray-900 p-4 mt-4 rounded-md">
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
                    className="w-full h-auto rounded-md"
                    onError={(d) => {
                      (d.target as HTMLImageElement).src = "/raven.png";
                    }}
                  />
                  <p className="text-xs mt-1">@{friend.username}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
      {user.realmojis.length && (
        <div className="bg-gray-100 dark:bg-gray-900 p-4 mt-4 rounded-md">
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
                  className="w-full h-auto rounded-md"
                  onError={(d) => {
                    (d.target as HTMLImageElement).src = "/raven.png";
                  }}
                />
                <p className="text-xs mt-1">{realmoji.emoji}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
