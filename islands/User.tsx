import { useEffect } from "preact/hooks";
import { fetchFriend, user } from "~/state/user.ts";
import { getSession } from "~/state/auth.ts";
import Spinner from "~/components/Spinner.tsx";
import { execute } from "~/client.ts";

export default function User({ id }: { id: string }) {
  useEffect(() => {
    fetchFriend(id);
  }, []);

  const friend = user.value;

  if (friend === null) {
    return <Spinner />;
  }

  return (
    <div className="profile-page dark:bg-gray-800 dark:text-white p-4 min-h-screen max-w-md mx-auto pb-4">
      <div className="relative">
        <img
          src={(friend.profilePicture ?? { url: "/raven.png" }).url}
          alt={friend.username}
          className="profile-picture w-full h-auto rounded-md"
          onError={(d) => {
            (d.target as HTMLImageElement).src = "/raven.png";
          }}
        />
      </div>
      <div className="profile-details mt-4">
        <h1 className="username text-3xl font-semibold">
          @{friend.username}
        </h1>
        <p className="location text-lg text-gray-300">{friend.location}</p>
        <p className="bio text-xl mt-2">{friend.biography}</p>
        {friend.relationship.status
          ? (
            <p className="text-gray-400 mt-6">
              Friends since {new Date(friend.relationship.friendedAt)
                .toLocaleDateString(
                  undefined,
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  },
                )}
            </p>
          )
          : (
            <button
              className="opacity-50 cursor-not-allowed w-full my-4 py-3 rounded-md bg-black text-white border-white dark:bg-white dark:border-black dark:text-black"
              disabled
              onClick={async (evt) => {
                const auth = await getSession();
                if (auth === null) {
                  return;
                }
                const data = await execute(
                  "user",
                  { profile_id: id },
                  auth.access_token,
                );
                console.log(data);
                (evt.target as HTMLButtonElement).disabled = true;
              }}
            >
              Add Friend
            </button>
          )}
      </div>
      {friend.relationship.commonFriends.total > 0 && (
        <div className="bg-gray-100 dark:bg-gray-900 p-4 my-4 rounded-md">
          <h2 className="text-lg font-semibold mb-2">
            Common Friends ({friend.relationship.commonFriends.total})
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {friend.relationship.commonFriends.sample.map((commonFriend) => (
              <a
                href={`/user/${commonFriend.id}`}
                key={commonFriend.id}
                className="p-2 rounded-lg bg-white dark:bg-gray-800"
              >
                <img
                  src={(commonFriend.profilePicture ?? { url: "/raven.png" })
                    .url}
                  alt={commonFriend.username}
                  className="w-full h-auto rounded-md"
                  onError={(d) => {
                    (d.target as HTMLImageElement).src = "/raven.png";
                  }}
                />
                <p className="text-xs mt-1">
                  @{commonFriend.username}
                </p>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
