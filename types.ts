import { z } from "zod";

export type EntryProps = {
  id: string;
  title: string;
  description: string;
  placeholder: string;
  buttonText: string;
  disabled: boolean;
  handler: (retry?: boolean) => void;
};

export type Auth = {
  access_token: string;
  refresh_token: string;
  token_type: "bearer";
  expiration: number;
  uid: string;
  is_new_user: boolean;
};

export type FeedResp = {
  userPosts: {
    user: {
      id: string;
      username: string;
      profilePicture: {
        url: string;
        width: number;
        height: number;
      };
    };
    region: string;
    momentId: string;
    posts: {
      id: string;
      visibility: string[];
      primary: {
        url: string;
        width: number;
        height: number;
      };
      secondary: {
        url: string;
        width: number;
        height: number;
      };
      location: {
        longitude: number;
        latitude: number;
      };
      retakeCounter: number;
      lateInSeconds: number;
      isLate: boolean;
      isMain: boolean;
      realMojis: {
        id: string;
        user: {
          id: string;
          username: string;
          profilePicture: {
            url: string;
            width: number;
            height: number;
          };
        };
        media: {
          url: string;
          width: number;
          height: number;
        };
        type: string;
        emoji: string;
        isInstant: boolean;
        postedAt: string;
      }[];
      comments: {
        id: string;
        user: {
          id: string;
          username: string;
          profilePicture: {
            url: string;
            width: number;
            height: number;
          };
        };
        content: string;
        postedAt: string;
      }[];
      tags: never[];
      unblurCount: number;
      takenAt: string;
      creationDate: string;
      updatedAt: string;
    }[];
  } | null;
  friendsPosts: {
    user: {
      id: string;
      username: string;
      profilePicture: {
        url: string;
        width: number;
        height: number;
      };
    };
    momentId: string;
    region: string;
    moment: {
      id: string;
      region: string;
    };
    posts: {
      id: string;
      primary: {
        url: string;
        width: number;
        height: number;
      };
      secondary: {
        url: string;
        width: number;
        height: number;
      };
      location?: {
        latitude: number;
        longitude: number;
      };
      retakeCounter: number;
      lateInSeconds: number;
      isLate: boolean;
      isMain: boolean;
      takenAt: string;
      realMojis: {
        id: string;
        user: {
          id: string;
          username: string;
          profilePicture: {
            url: string;
            width: number;
            height: number;
          };
        };
        media: {
          url: string;
          width: number;
          height: number;
        };
        type: string;
        emoji: string;
        isInstant: boolean;
        postedAt: string;
      }[];
      comments: {
        id: string;
        user: {
          id: string;
          username: string;
          profilePicture: {
            url: string;
            width: number;
            height: number;
          };
        };
        content: string;
        postedAt: string;
      }[];
      tags: never[];
      creationDate: string;
      updatedAt: string;
      visibility: string[];
      caption?: string;
      music?: {
        isrc: string;
        openUrl: string;
        visibility: string;
        track: string;
        artist: string;
        provider: string;
        providerId: string;
        artwork: string;
        audioType: string;
      };
    }[];
  }[];
  remainingPosts: number;
  maxPostsPerMoment: number;
  unblur: {
    unblurs: never[];
    maxUnblursPerMoment: number;
    remainingUnblurs: number;
  };
};

export type FriendResp = {
  id: string;
  username: string;
  fullname: string;
  biography: string;
  location: string;
  profilePicture: {
    url: string;
    width: number;
    height: number;
  };
  relationship: {
    status: "accepted" | null;
    commonFriends: {
      sample: {
        id: string;
        username: string;
        fullname: string;
        profilePicture: {
          url: string;
          width: number;
          height: number;
        };
      }[];
      total: number;
    };
    friendedAt: string;
  };
  createdAt: string;
  isRealPeople: boolean;
};

export type MeResp = {
  id: string;
  username: string;
  birthdate: string;
  fullname: string;
  profilePicture: {
    url: string;
    width: number;
    height: number;
  };
  realmojis: {
    id: string;
    userId: string;
    emoji: string;
    media: {
      url: string;
      width: number;
      height: number;
    };
  }[];
  devices: {
    clientVersion: string;
    device: string;
    deviceId: string;
    platform: string;
    language: string;
    timezone: string;
  }[];
  canDeletePost: boolean;
  canPost: boolean;
  canUpdateRegion: boolean;
  phoneNumber: string;
  biography: string;
  location: string;
  countryCode: string;
  region: string;
  createdAt: string;
  isRealPeople: boolean;
};

export type FriendList = {
  next: never;
  total: number;
  data: {
    id: string;
    username: string;
    fullname: string;
    profilePicture?: {
      url: string;
      height: number;
      width: number;
    };
    status: string;
  }[];
};

export type AppState =
  | {
    loggedIn: true;
  } & {
    auth: Auth;
  }
  | {
    loggedIn: false;
  };

export type GitHubDeployments = {
  url: string;
  id: number;
  node_id: string;
  task: string;
  original_environment: string;
  environment: string;
  description: never;
  created_at: string;
  updated_at: string;
  statuses_url: string;
  repository_url: string;
  creator: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  sha: string;
  ref: string;
  payload: {
    project_id: string;
    project_name: string;
  };
  transient_environment: boolean;
  production_environment: boolean;
  performed_via_github_app: never;
}[];

export type GitHubCommits = {
  sha: string;
  node_id: string;
  commit: {
    author: {
      name: string;
      email: string;
      date: string;
    };
    committer: {
      name: string;
      email: string;
      date: string;
    };
    message: string;
    tree: {
      sha: string;
      url: string;
    };
    url: string;
    comment_count: number;
    verification: {
      verified: boolean;
      reason: string;
      signature: never;
      payload: never;
    };
  };
  url: string;
  html_url: string;
  comments_url: string;
  author: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  committer: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  parents: {
    sha: string;
    url: string;
    html_url: string;
  }[];
}[];

export type ChangeLogResponse = {
  sha: string;
  message: string;
  url: string;
}[];

export type KvCache = {
  data: GitHubDeployments;
  timestamp: Date;
};

export type JWTPayload = {
  uid: string;
  user_id: string;
  phone_number_country_code: string;
  iss: "https://auth.bereal.team/";
  aud: "ios";
  iat: number;
  exp: number;
};

export type DiscoveryResp = {
  posts: {
    id: string;
    bucket: string;
    creationDate: {
      _seconds: number;
      _nanoseconds: number;
    };
    imageHeight: number;
    imageWidth: number;
    isPublic: boolean;
    lateInSeconds: number;
    location?: {
      _latitude: number;
      _longitude: number;
    };
    mediaType: string;
    notificationID: string;
    ownerID: string;
    photoURL: string;
    region: string;
    realMojis: {
      id: string;
      uid: string;
      userName: string;
      user: {
        id: string;
        username: string;
        profilePicture: {
          url: string;
          width: number;
          height: number;
        };
      };
      date: {
        _seconds: number;
        _nanoseconds: number;
      };
      emoji: string;
      type: string;
      uri: string;
    }[];
    retakeCounter: number;
    secondaryImageHeight: number;
    secondaryImageWidth: number;
    secondaryPhotoURL: string;
    takenAt: {
      _seconds: number;
      _nanoseconds: number;
    };
    updatedAt: number;
    user: {
      id: string;
      username: string;
      profilePicture: {
        url: string;
        width: number;
        height: number;
      };
    };
    userName: string;
    visibility: string[];
    caption?: string;
  }[];
  lastIndex: string;
};

export type Posts = FeedResp["friendsPosts"][number]["posts"][number];

export type FriendEntry = FeedResp["friendsPosts"][number];

export type SelfPost = NonNullable<FeedResp["userPosts"]>["posts"][number];

type MaybePromise<T> = T | Promise<T>;

type Out<T> = { data: T } | { error: unknown };

type Pair<T, K> = {
  in: T;
  out: Out<K>;
};

export type APIMap = {
  search: Pair<{ query: string }, unknown>;
  feed: Pair<Record<string, never>, FeedResp>;
  add: Pair<{ userId: string; source: "search" }, unknown>;
  friends: Pair<Record<string, never>, FriendList>;
  me: Pair<Record<string, never>, MeResp>;
  react: Pair<{ emoji: string; postId: string; postUserId: string }, unknown>;
  refresh: Pair<
    { refreshToken: string },
    { access_token: string; refresh_token: string; expires_in: number }
  >;
  user: Pair<{ profile_id: string }, FriendResp>;
};

export type ApiFunction = {
  [k in keyof APIMap]: (
    data: APIMap[k]["in"],
    token: string,
  ) => MaybePromise<APIMap[k]["out"]>;
};

export type ApiValidators = {
  [k in keyof APIMap]: z.ZodType<APIMap[k]["in"]>;
};
