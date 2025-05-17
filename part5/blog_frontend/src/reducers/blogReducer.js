import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlogs(state, action) {
      state.push(action.payload);
      state.sort((a, b) => b.votes - a.votes);
    },
    updateBlogs(state, action) {
      const updated = action.payload;
      return state
        .map((blog) => (blog.id === updated.id ? updated : blog))
        .sort((a, b) => b.votes - a.votes);
    },
  },
});

export const { setBlogs, appendBlogs, updateBlogs } = blogSlice.actions;

export const getBlogs = () => async (dispatch) => {
  try {
    const blogs = await blogService.getAll();
    console.log("blogs", blogs);
    dispatch(setBlogs(blogs));
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
  }
};

export default blogSlice.reducer;
