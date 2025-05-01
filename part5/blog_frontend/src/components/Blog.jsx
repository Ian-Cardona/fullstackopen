import BlogDetails from "./BlogDetails";
import Togglable from "./Togglable";
import blogService from "../services/blogs";
import { useState } from "react";

const Blog = ({ blog, user }) => {
  const [likes, setLikes] = useState(blog.likes);

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: likes + 1,
    };
    await blogService.update(blog._id, updatedBlog);
    setLikes(likes + 1);
  };

  const handleRemove = async () => {
    if (window.confirm("Are you sure?")) {
      await blogService.remove(blog._id);
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div className="blog" style={blogStyle}>
      {blog.title} {blog.author}
      <Togglable buttonLabel="view">
        <BlogDetails
          blog={blog}
          user={user}
          likes={likes}
          onLike={handleLike}
          onRemove={handleRemove}
        />
      </Togglable>
    </div>
  );
};

export default Blog;
