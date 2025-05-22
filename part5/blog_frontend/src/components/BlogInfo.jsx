import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import BlogDetails from "./BlogDetails";
import blogService from "../services/blogs";
import { useLoginValue } from "../hooks/useLogin";

const BlogInfo = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const user = useLoginValue();

  const blogs = queryClient.getQueryData(["blogs"]) || [];
  console.log("blogs", blogs, "id", id);

  const blog = blogs.find((blog) => blog._id === id);

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

  const handleRemove = async () => {
    if (window.confirm("Are you sure?")) {
      deleteBlogMutation.mutate(blog._id);
    }
  };

  const handleLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    likeBlogMutation.mutate(updatedBlog);
  };

  if (!blog) return null;

  return (
    <div>
      <h2>{blog.title}</h2>
      <BlogDetails
        blog={blog}
        user={user}
        likes={blog.likes}
        onLike={() => handleLike(blog)}
        onRemove={handleRemove}
      />
    </div>
  );
};

export default BlogInfo;
