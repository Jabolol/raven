import { useEffect } from "preact/hooks";
import { feed, fetchFeed } from "../state/feed.ts";
import Post from "./Post.tsx";
import Spinner from "../components/Spinner.tsx";
import Footer from "../components/Footer.tsx";

export default function Feed() {
  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {feed.value === null ? <Spinner /> : (
        <div className="pb-8">
          {feed.value.friendsPosts.reverse().map((post) => <Post {...post} />)}
        </div>
      )}
      <Footer />
    </div>
  );
}
