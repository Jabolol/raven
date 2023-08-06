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
      } dark:bg-gray-800 dark:text-white min-h-screen`}
    >
      <div
        className={`profile-header ${
          friend.isRealPeople ? "real-people-header" : ""
        } relative`}
      >
        <img
          src={friend.profilePicture.url}
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
        <div className="relationship mt-6">
          <p className="text-lg">{friend.relationship.status}</p>
          <p className="text-gray-400">
            Friends since {formatDate(friend.relationship.friendedAt)}
          </p>
        </div>
      </div>
      <div className="common-friends mt-10 pb-4">
        <h2 className="text-2xl font-semibold ml-4">
          Common Friends ({friend.relationship.commonFriends.total})
        </h2>
        <div className="friend-list grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 mx-4">
          {friend.relationship.commonFriends.sample.map((commonFriend) => (
            <a
              href={`/user/${commonFriend.id}`}
              key={commonFriend.id}
              className="friend-card p-4 border rounded-lg shadow-md flex flex-col items-center"
            >
              <img
                src={commonFriend.profilePicture.url}
                alt={commonFriend.username}
                className="friend-picture rounded-full w-16 h-16 mb-2"
              />
              <p className="friend-username text-sm">
                @{commonFriend.username}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
