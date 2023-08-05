export type EntryProps = {
  id: string;
  title: string;
  description: string;
  placeholder: string;
  buttonText: string;
  disabled: boolean;
  handler: (...args: unknown[]) => void;
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
  userPosts: never;
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
      comments: never[];
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

export type AppState =
  | {
    loggedIn: true;
  } & {
    auth: Auth;
  }
  | {
    loggedIn: false;
  };
