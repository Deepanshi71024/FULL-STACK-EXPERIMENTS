import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  entities: {
    1: {
      id: 1,
      title: "Learning React",
      content: "React is a JavaScript library.",
      platformId: 1,
    },
    2: {
      id: 2,
      title: "Learning Redux",
      content: "Redux helps manage global state.",
      platformId: 2,
    },
    3: {
      id: 3,
      title: "Frontend Development",
      content: "Frontend development uses HTML, CSS and JavaScript.",
      platformId: 1,
    },
  },

  ids: [1, 2, 3],

  status: "idle",
  error: null,
};

const postsSlice = createSlice({
  name: "posts",

  initialState,

  reducers: {
    // CREATE
    addPost: {
      reducer(state, action) {
        const post = action.payload;
        const normalizedTitle = post.title.trim().toLowerCase();
        const normalizedContent = post.content.trim().toLowerCase();

        const alreadyExists = state.ids.some((id) => {
          const existingPost = state.entities[id];

          if (!existingPost) {
            return false;
          }

          return (
            existingPost.title.trim().toLowerCase() === normalizedTitle &&
            existingPost.content.trim().toLowerCase() === normalizedContent &&
            existingPost.platformId === post.platformId
          );
        });

        if (alreadyExists) {
          return;
        }

        state.entities[post.id] = post;
        state.ids.push(post.id);
      },

      prepare(title, content, platformId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            platformId,
          },
        };
      },
    },

    // UPDATE
    updatePost(state, action) {
      const { id, title, content, platformId } = action.payload;

      if (state.entities[id]) {
        state.entities[id].title = title;
        state.entities[id].content = content;
        state.entities[id].platformId = platformId;
      }
    },

    // DELETE
    deletePost(state, action) {
      const id = action.payload;

      delete state.entities[id];

      state.ids = state.ids.filter(
        (postId) => postId !== id
      );
    },
  },
});

export const {
  addPost,
  updatePost,
  deletePost,
} = postsSlice.actions;

export default postsSlice.reducer;