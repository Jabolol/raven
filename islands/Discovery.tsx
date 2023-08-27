import { useEffect } from "preact/hooks";
import { discovery, fetchDiscovery } from "~/state/discovery.ts";
import Post from "~/islands/Post.tsx";
import Spinner from "~/components/Spinner.tsx";
import IconBoxOff from "icons/box-off.tsx";

export default function Discovery() {
  useEffect(() => {
    fetchDiscovery();
  }, []);

  if (discovery.value === null) {
    return <Spinner />;
  }

  if (discovery.value.posts.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <IconBoxOff className="dark:text-gray-300 text-gray-800 text-center w-16 h-16" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="pb-4">
        {discovery.value.posts.reverse().map((post) => (
          <div key={post.id} class="m-4">
            <Post
              user={post.user}
              region={post.region}
              posts={[{
                ...post,
                primary: {
                  url: post.photoURL,
                  width: post.imageWidth,
                  height: post.imageHeight,
                },
                secondary: {
                  url: post.secondaryPhotoURL,
                  width: post.secondaryImageWidth,
                  height: post.secondaryImageHeight,
                },
                isLate: post.lateInSeconds > 0,
                isMain: true,
                tags: [],
                comments: [],
                location: post.location
                  ? {
                    latitude: post.location._latitude,
                    longitude: post.location._longitude,
                  }
                  : undefined,
                takenAt: new Date(post.takenAt._seconds * 1e3).toISOString(),
                realMojis: post.realMojis.map((realMoji) => ({
                  id: realMoji.id,
                  user: {
                    id: realMoji.user.id,
                    username: realMoji.user.username,
                    profilePicture: {
                      url:
                        (realMoji.user.profilePicture ?? { url: "/raven.png" })
                          .url,
                      width:
                        (realMoji.user.profilePicture ?? { width: -1 }).width,
                      height:
                        (realMoji.user.profilePicture ?? { height: -1 }).height,
                    },
                  },
                  media: {
                    url: realMoji.uri,
                    width: -1,
                    height: -1,
                  },
                  type: realMoji.type,
                  emoji: realMoji.emoji,
                  isInstant: false,
                  postedAt: new Date(realMoji.date._seconds * 1e3)
                    .toISOString(),
                })),
                creationDate: new Date(
                  post.creationDate._seconds * 1e3,
                ).toISOString(),
                updatedAt: new Date(post.updatedAt * 1e3).toISOString(),
              }]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
