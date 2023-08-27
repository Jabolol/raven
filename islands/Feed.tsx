import { useEffect } from "preact/hooks";
import { feed, fetchFeed } from "~/state/feed.ts";
import Post from "~/islands/Post.tsx";
import Spinner from "~/components/Spinner.tsx";
import IconBoxOff from "icons/box-off.tsx";

export default function Feed() {
  useEffect(() => {
    fetchFeed();
  }, []);

  if (feed.value === null) {
    return <Spinner />;
  }

  if (feed.value.friendsPosts.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <IconBoxOff className="dark:text-gray-300 text-gray-800 text-center w-16 h-16" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="pb-4">
        {feed.value.friendsPosts.reverse().map((post, id) => (
          <div key={`${post.momentId}-${id}`} class="m-4">
            <Post
              user={post.user}
              region={post.region}
              posts={post.posts}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
