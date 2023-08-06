import { useEffect } from "preact/hooks";
import { fetchFriend, user } from "../state/user.ts";
import { isLoggedIn } from "../state/auth.ts";
import Spinner from "../components/Spinner.tsx";

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export default function User({ id }: { id: string }) {
  useEffect(() => {
    if (!isLoggedIn.value) window.location.href = "/";
    fetchFriend(id);
  }, []);

  const friend = user.value;

  return friend === null ? <Spinner /> : (
    <div
      className={`profile-page ${
        friend.isRealPeople ? "real-people" : ""
      } dark:bg-gray-800 dark:text-white min-h-screen max-w-md mx-auto pb-4`}
    >
      <div
        className={`profile-header ${
          friend.isRealPeople ? "real-people-header" : ""
        } relative`}
      >
        <img
          src={(friend.profilePicture ?? { url: "/raven.png" }).url}
          alt={friend.username}
          className="profile-picture w-full h-auto"
        />
      </div>
      <div className="profile-details ml-4 mt-4">
        <h1 className="username text-3xl font-semibold">
          @{friend.username}
        </h1>
        <p className="location text-lg text-gray-300">{friend.location}</p>
        <p className="bio text-xl mt-2">{friend.biography}</p>
        <p className="text-gray-400 mt-6">
          {friend.relationship.status === null
            ? "You are not friends"
            : `Friends since ${formatDate(friend.relationship.friendedAt)}`}
        </p>
      </div>
      <div className="bg-gray-100 dark:bg-gray-900 p-4 m-4 rounded-md">
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
                src={(commonFriend.profilePicture ?? { url: "/raven.png" }).url}
                alt={commonFriend.username}
                className="w-full h-auto rounded-md"
              />
              <p className="text-xs mt-1">
                @{commonFriend.username}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
