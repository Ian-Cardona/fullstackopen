import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { createBlog } from "../reducers/blogReducer";
import { useNotificationDispatch } from "../hooks/useNotification";
// import { useBlogDispatch } from "../hooks/useBlogs";
import blogService from "../services/blogs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { showNotification } from "../reducers/notificationReducer";

const CreateForm = ({ blogFormRef }) => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();
  // const blogDispatch = useBlogDispatch();

  const createBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]) || [];
      queryClient.setQueryData(["blogs"], blogs.concat(newBlog));
      // blogDispatch({ type: "APPEND_BLOGS", payload: updatedBlogs });
    },
  });
  // const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreate = async ({ title, author, url }) => {
    try {
      blogFormRef.current.toggleVisibility();
      // await dispatch(createBlog({ title, author, url }));
      createBlogMutation.mutate({ title, author, url });

      dispatch(
        {
          type: "SET",
          payload: {
            statusCode: 200,
            message: `A new blog ${title} by ${author} created!`,
          },
        }
        // showNotification(`A new blog ${title} by ${author} created!`, 200, 5)
      );
      setTimeout(() => {
        dispatch({ type: "CLEAR" });
      }, 5000);
    } catch (e) {
      const errorMsg =
        e?.response?.data?.error || e?.message || "Something went wrong";
      const errorCode = e?.response?.status || 500;
      // dispatch(showNotification(errorMsg, errorCode, 5));
      dispatch(
        { type: "ERROR", payload: { statusCode: errorCode, message: errorMsg } }
        // showNotification(`A new blog ${title} by ${author} created!`, 200, 5)
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleCreate({
      title,
      author,
      url,
    });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="title"
            id="cb-title-field"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="author"
            id="cb-author-field"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="url"
            id="cb-url-field"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default CreateForm;
