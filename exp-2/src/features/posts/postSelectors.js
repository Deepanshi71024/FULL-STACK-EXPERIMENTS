import { createSelector } from "@reduxjs/toolkit";

export const selectPostsState = (state) => state.posts;

export const selectPlatformsState = (state) => state.platforms;

// Get all posts
export const selectAllPosts = createSelector(
  [selectPostsState],
  (postsState) =>
    postsState.ids.map(
      (id) => postsState.entities[id]
    )
);

// Get all platforms
export const selectAllPlatforms = createSelector(
  [selectPlatformsState],
  (platformsState) =>
    platformsState.ids.map(
      (id) => platformsState.entities[id]
    )
);

// Memoized selector
export const selectPostsWithPlatforms = createSelector(
  [selectAllPosts, selectAllPlatforms],

  (posts, platforms) => {
    return posts.map((post) => {
      const platform = platforms.find(
        (platform) => platform.id === post.platformId
      );

      return {
        ...post,
        platformName: platform
          ? platform.name
          : "Unknown",
      };
    });
  }
);

// Filter posts by platform
export const selectPostsByPlatform = createSelector(
  [
    selectPostsWithPlatforms,
    (_, platformId) => platformId,
  ],

  (posts, platformId) => {
    if (platformId === "all") {
      return posts;
    }

    return posts.filter(
      (post) =>
        String(post.platformId) === String(platformId)
    );
  }
);