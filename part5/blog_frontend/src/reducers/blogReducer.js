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
        .map((blog) => (blog._id === updated._id ? updated : blog))
        .sort((a, b) => b.likes - a.likes);
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog._id !== action.payload);
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
    console.log("create blog");
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
    throw error;
  }
};

export const updateBlog = (blog) => async (dispatch) => {
  try {
    const updated = await blogService.update(blog._id, blog);
    dispatch(updateBlogs(updated));
  } catch (error) {
    console.error("Failed to update blog:", error);
    throw error;
  }
};

export default blogSlice.reducer;
