import { createContext, useReducer } from "react";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "SET_BLOGS":
      return action.payload;
    case "APPEND_BLOGS":
      return action.payload;
    case "UPDATE_BLOGS":
      return action.payload;
    default:
      return state;
  }
};

const BlogContext = createContext();

export const BlogContextProvider = (props) => {
  const [blog, blogDispatch] = useReducer(blogReducer, {
    title: "",
    author: "",
    url: "",
    likes: 0,
  });

  return (
    <BlogContext.Provider value={[blog, blogDispatch]}>
      {props.children}
    </BlogContext.Provider>
  );
};

export default BlogContext;
