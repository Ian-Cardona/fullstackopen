import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import CreateForm from "./components/CreateForm";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import { getBlogs } from "./reducers/blogReducer";
import { clearUser, setUser } from "./reducers/loginReducer";

function App() {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.login);
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  const blogFormRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getBlogs());
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    try {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    } catch (e) {
      localStorage.removeItem("loggedInUser");
    }
  }, [dispatch]);

  const handleLogout = () => {
    window.localStorage.clear();
    dispatch(clearUser());
  };

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <div style={{ display: "flex", alignItems: "center" }}>
        <p>{user.name} is logged in</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <CreateForm />
      </Togglable>
      {!blogs || blogs.length === 0 ? (
        <p>No blogs</p>
      ) : (
        sortedBlogs.map((blog) => (
          <div key={blog._id}>
            <Blog blog={blog} user={user} />
          </div>
        ))
      )}
    </div>
  );
}

export default App;
