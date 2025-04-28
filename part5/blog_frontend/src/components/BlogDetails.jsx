import { useEffect, useState } from "react";
import blogService from "../services/blogs";

const BlogDetails = ({ blog, user }) => {
  const [blogUser, setBlogUser] = useState("");
  const [likes, setLikes] = useState(blog.likes);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    if (blog.user) {
      setBlogUser(blog.user.name);
      blog.user.name === user.name && setIsUser(true);
    }
  }, [blog, user]);

  const showRemoveButton = {
    display: isUser ? "" : "none",
  };

  const handleAddLikes = async (event) => {
    event.preventDefault();
    await blogService.update(blog._id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes + 1,
    });
    setLikes(likes + 1);
  };

  const handleRemove = async (event) => {
    event.preventDefault();
    if (window.confirm("Are you sure?")) {
      await blogService.remove(blog._id);
    }
  };

  return (
    <div key={blog._id}>
      {blog.url}
      <br />
      likes {likes} <button onClick={handleAddLikes}>like</button>
      <br />
      {blogUser}
      <br />
      <div style={showRemoveButton}>
        <button onClick={handleRemove}>remove</button>
      </div>
    </div>
  );
};

export default BlogDetails;
