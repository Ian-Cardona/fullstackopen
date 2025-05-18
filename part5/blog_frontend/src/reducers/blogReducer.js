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
    removeBlog(state, action) {
      console.log("action id", action.payload);
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const { setBlogs, appendBlogs, updateBlogs, removeBlog } =
  blogSlice.actions;

export const getBlogs = () => async (dispatch) => {
  try {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
  }
};

export const createBlog = (blog) => async (dispatch) => {
  try {
    const newBlog = await blogService.create(blog);
    dispatch(appendBlogs(newBlog));
  } catch (e) {
    console.error("Failed to create blog:", e);
    throw e;
  }
};

export const deleteBlog = (id) => async (dispatch) => {
  try {
    await blogService.remove(id);
    dispatch(removeBlog(id));
  } catch (error) {
    console.error("Failed to delete blog:", error);
  }
};

export default blogSlice.reducer;
