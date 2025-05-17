import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import CreateForm from "./components/CreateForm";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import { showNotification } from "./reducers/notificationReducer";
import { getBlogs } from "./reducers/blogReducer";

function App() {
  const blogs = useSelector((state) => state.blogs);
  console.log("blogs", blogs);
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [statusCode, setStatusCode] = useState(null);
  const blogFormRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setErrorMessage("");
    } catch (exception) {
      const errorMsg = exception.response
        ? exception.response.data.error
        : "Something went wrong";
      setStatusCode(exception.response ? exception.response.status : 500);
      setErrorMessage(errorMsg);
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const handleLike = async (blog) => {
    const likesCount = blog.likes;
    const updateLikes = {
      likes: likesCount + 1,
    };
    await blogService.update(blog._id, updateLikes);
    dispatch(getBlogs());
  };

  const handleUsernameChange = (value) => {
    setUsername(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };
  const handleCreate = async ({ title, author, url }) => {
    try {
      blogFormRef.current.toggleVisibility();
      await blogService.create({ title, author, url });
      dispatch(getBlogs());
      dispatch(
        showNotification(`A new blog ${title} by ${author} created!`, 200, 5)
      );
    } catch (exception) {
      dispatch(
        showNotification(
          exception.response.data.error
            ? exception.response.data.error
            : "Something went wrong",
          exception.response ? exception.response.status : 500,
          5
        )
      );
    }
  };

  if (!user) {
    return (
      <LoginForm
        errorMessage={errorMessage}
        handleLogin={handleLogin}
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        username={username}
        password={password}
      />
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={errorMessage} statusCode={statusCode} />
      <div style={{ display: "flex", alignItems: "center" }}>
        <p>{user.name} is logged in</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <CreateForm handleCreate={handleCreate} />
      </Togglable>
      {!blogs || blogs.length === 0 ? (
        <p>No blogs</p>
      ) : (
        sortedBlogs.map((blog) => (
          <div key={blog._id}>
            <Blog blog={blog} user={user} handleLike={handleLike} />
          </div>
        ))
      )}
    </div>
  );
}

export default App;
