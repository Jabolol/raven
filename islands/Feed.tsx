import { useEffect } from "preact/hooks";
import { feed, fetchFeed } from "../state/feed.ts";
import Post from "./Post.tsx";

export default function Feed() {
  useEffect(() => {
    fetchFeed();
  }, []);

  return (feed.value === null
    ? (
      <div className="flex justify-center items-center h-screen">
        <div className="dark:text-white">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      </div>
    )
    : (
      <div className="pb-8">
        {feed.value.friendsPosts.reverse().map((post) => <Post {...post} />)}
      </div>
    ));
}
