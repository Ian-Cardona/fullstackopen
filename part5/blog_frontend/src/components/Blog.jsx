import Togglable from "./Togglable";
import BlogDetails from "./BlogDetails";
// import { useDispatch } from "react-redux";
// import { deleteBlog, updateBlogs } from "../reducers/blogReducer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";

const Blog = ({ blog, user }) => {
  const queryClient = useQueryClient();
  const likeBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
  });
  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
  });

  // const dispatch = useDispatch();
  const handleRemove = async () => {
    if (window.confirm("Are you sure?")) {
      // await dispatch(deleteBlog(blog._id));
      deleteBlogMutation.mutate(blog._id);
    }
  };

  const handleLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    // await dispatch(updateBlogs(updatedBlog));
    likeBlogMutation.mutate(updatedBlog);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div className="blog" data-testid="blog" style={blogStyle}>
      {blog.title} {blog.author}
      <Togglable buttonLabel="view">
        <BlogDetails
          blog={blog}
          user={user}
          likes={blog.likes}
          onLike={() => handleLike(blog)}
          onRemove={handleRemove}
        />
      </Togglable>
    </div>
  );
};

export default Blog;
