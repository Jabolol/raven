import { useEffect } from "preact/hooks";
import { feed, fetchFeed } from "../state/feed.ts";
import Post from "./Post.tsx";
import Spinner from "../components/Spinner.tsx";

export default function Feed() {
  useEffect(() => {
    fetchFeed();
  }, []);

  return (feed.value === null ? <Spinner /> : (
    <div className="pb-8">
      {feed.value.friendsPosts.reverse().map((post) => <Post {...post} />)}
    </div>
  ));
}
