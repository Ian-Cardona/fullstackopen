import Togglable from "./Togglable";
import BlogDetails from "./BlogDetails";
import { useDispatch } from "react-redux";
import { deleteBlog, updateBlogs } from "../reducers/blogReducer";

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch();
  const handleRemove = async () => {
    if (window.confirm("Are you sure?")) {
      await dispatch(deleteBlog(blog._id));
    }
  };

  const handleLike = async (blog) => {
    console.log("blog", blog);
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    await dispatch(updateBlogs(updatedBlog));
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
