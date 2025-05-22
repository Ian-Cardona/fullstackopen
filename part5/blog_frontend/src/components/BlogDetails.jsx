const BlogDetails = ({ blog, user, likes, onLike, onRemove }) => {
  const isUser = blog.user?.name === user.name;

  return (
    <div>
      <a href={blog.url}>{blog.url}</a>
      <br />
      {likes} likes{" "}
      <button className="button-like" onClick={onLike}>
        like
      </button>
      <br />
      {!blog.user ? null : <>Added by {blog.user?.name}</>}
      <br />
      {isUser && (
        <div>
          <button onClick={onRemove}>remove</button>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
