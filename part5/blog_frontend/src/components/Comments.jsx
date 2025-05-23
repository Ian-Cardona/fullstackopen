const Comments = ({ handleComment, blog }) => {
  return (
    <div>
      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <input name="comment" />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
