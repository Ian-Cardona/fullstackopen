// import { createContext, useReducer } from "react";

// const blogReducer = (state, action) => {
//   switch (action.type) {
//     case "SET_BLOGS":
//       return action.payload;
//     case "APPEND_BLOGS":
//       state.push(action.payload);
//       return state.sort((a, b) => b.votes - a.votes);
//     case "UPDATE_BLOGS": {
//       const updated = action.payload;
//       return state
//         .map((blog) => (blog._id === updated._id ? updated : blog))
//         .sort((a, b) => b.likes - a.likes);
//     }
//     default:
//       return state;
//   }
// };

// const BlogContext = createContext();

// export const BlogContextProvider = (props) => {
//   const [blogs, blogDispatch] = useReducer(blogReducer, []);

//   return (
//     <BlogContext.Provider value={[blogs, blogDispatch]}>
//       {props.children}
//     </BlogContext.Provider>
//   );
// };

// export default BlogContext;
