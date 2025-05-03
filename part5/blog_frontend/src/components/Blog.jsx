import blogService from "../services/blogs";
import Togglable from "./Togglable";
import BlogDetails from "./BlogDetails";

const Blog = ({ blog, user, setBlogs, handleLike }) => {
  const handleRemove = async () => {
    if (window.confirm("Are you sure?")) {
      await blogService.remove(blog._id);
      const updatedBlogs = await blogService.getAll();
      setBlogs(updatedBlogs);
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
