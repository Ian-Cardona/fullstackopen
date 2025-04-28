import BlogDetails from "./BlogDetails";
import Togglable from "./Togglable";

const Blog = ({ blog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <Togglable buttonLabel="view">
        <BlogDetails key={blog.id} blog={blog} user={user} />
      </Togglable>
    </div>
  );
};

export default Blog;
