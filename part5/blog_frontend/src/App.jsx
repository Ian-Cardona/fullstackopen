import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import CreateForm from "./components/CreateForm";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
// import { getBlogs } from "./reducers/blogReducer";
import { clearUser, setUser } from "./reducers/loginReducer";
import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { useBlogDispatch, useBlogValue } from "./hooks/useBlogs";

function App() {
  const queryClient = useQueryClient();

  // const blogs = useBlogValue();
  // const blogDispatch = useBlogDispatch();

  // const getBlogsMutation = useMutation({
  //   mutationFn: blogService.getAll,
  //   onSuccess: (newBlogs) => {
  //     queryClient.setQueryData(["blogs"], newBlogs);
  //     blogDispatch({ type: "SET_BLOGS", payload: newBlogs });
  //   },
  // });

  const {
    data: blogs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });

  // const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.login);
  // const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  const blogFormRef = useRef();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await dispatch(getBlogs());
  //   };
  //   fetchData();
  // }, [dispatch]);

  // useEffect(() => {
  //   getBlogsMutation.mutate();
  //   console.log(blogs);
  // }, []);

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
    queryClient.clear(); // Optional: clears React Query cache on logout
  };

  if (!user) {
    return <LoginForm />;
  }

  if (isLoading) {
    return <p>Loading blogs...</p>;
  }

  if (isError) {
    return <p>Error loading blogs.</p>;
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
        <CreateForm blogFormRef={blogFormRef} />
      </Togglable>
      {!blogs || blogs.length === 0 ? (
        <p>No blogs</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog._id}>
            <Blog blog={blog} user={user} />
          </div>
        ))
      )}
    </div>
  );
}

export default App;
