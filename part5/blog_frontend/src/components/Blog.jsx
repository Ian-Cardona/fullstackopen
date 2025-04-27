const Blog = ({ blog }) => {
  return (
    <div key={blog.id}>
      {blog.title} {blog.author}
    </div>
  );
};

export default Blog;
