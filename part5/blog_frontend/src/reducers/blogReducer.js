// import { createSlice } from "@reduxjs/toolkit";

// const blogSlice = createSlice({
//   name: "blog",
//   initialState: [],
//   reducer: {
//     setBlogs(state, action) {
//       return action.payload;
//     },
//     appendBlogs(state, action) {
//       state.push(action.payload);
//       state.sort((a, b) => b.votes - a.votes);
//     },
//     updateBlogs(state, action) {
//       const updated = action.payload;
//       return state
//         .map((blog) => (blog.id === updated.id ? updated : blog))
//         .sort((a, b) => b.votes - a.votes);
//     },
//   },
// });

// const getAll = () => {

// }

// export default blogSlice.reducer;
