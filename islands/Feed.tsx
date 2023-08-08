import { useEffect } from "preact/hooks";
import { feed, fetchFeed } from "../state/feed.ts";
import Post from "./Post.tsx";
import Spinner from "../components/Spinner.tsx";
import Footer from "../components/Footer.tsx";
import IconBoxOff from "icons/box-off.tsx";

export default function Feed() {
  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {feed.value === null
        ? <Spinner />
        : feed.value.friendsPosts.length === 0
        ? (
          <div className="flex justify-center items-center h-screen">
            <IconBoxOff className="dark:text-gray-300 text-gray-800 text-center w-16 h-16" />
          </div>
        )
        : (
          <div className="pb-8">
            {feed.value.friendsPosts.reverse().map((post) => (
              <Post
                {...post}
              />
            ))}
          </div>
        )}
      <Footer />
    </div>
  );
}
