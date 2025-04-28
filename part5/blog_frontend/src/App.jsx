import { useEffect, useRef, useState } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import CreateForm from "./components/CreateForm";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [statusCode, setStatusCode] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => setBlogs(initialBlogs));
  }, []);

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
    } catch (exception) {
      const errorMsg = exception.response
        ? exception.response.data.error
        : "Something went wrong";
      setStatusCode(exception.response ? exception.response.status : 500);
      setErrorMessage(errorMsg);
      setTimeout(() => setErrorMessage(null), 5000);
    }
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

  const handleCreate = async (title, author, url) => {
    try {
      blogFormRef.current.toggleVisibility();
      const newBlog = await blogService.create({ title, author, url });
      setBlogs((prevBlogs) => prevBlogs.concat(newBlog));
      setErrorMessage(`A new blog ${title} by ${author} created!`);
      setStatusCode(200);
      setTimeout(() => setErrorMessage(null), 5000);
    } catch (exception) {
      const errorMsg = exception.response
        ? exception.response.data.error
        : "Something went wrong";
      setStatusCode(exception.response ? exception.response.status : 500);
      setErrorMessage(errorMsg);
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  if (!user) {
    return (
      <LoginForm
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
      {errorMessage && (
        <Notification message={errorMessage} statusCode={statusCode} />
      )}
      <div style={{ display: "flex", alignItems: "center" }}>
        <p>{user.name} is logged in</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <CreateForm handleCreate={handleCreate} />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div key={blog._id}>
            <Blog key={blog._id} blog={blog} user={user} />
          </div>
        ))}
    </div>
  );
}

export default App;
