import { useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import CreateForm from "./components/CreateForm";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";

// import { getBlogs } from "./reducers/blogReducer";
// import { clearUser, setUser } from "./reducers/loginReducer";
import { useQuery } from "@tanstack/react-query";
import { useLoginDispatch, useLoginValue } from "./hooks/useLogin";
import { Routes, Route, Link } from "react-router-dom";
import Users from "./components/Users";
import UserInfo from "./components/UserInfo";
import BlogInfo from "./components/BlogInfo";
import { Button, Container, Nav, Navbar, Table } from "react-bootstrap";
// import { useBlogDispatch, useBlogValue } from "./hooks/useBlogs";

function App() {
  // const blogs = useBlogValue();
  // const blogDispatch = useBlogDispatch();

  // const getBlogsMutation = useMutation({
  //   mutationFn: blogService.getAll,
  //   onSuccess: (newBlogs) => {
  //     queryClient.setQueryData(["blogs"], newBlogs);
  //     blogDispatch({ type: "SET_BLOGS", payload: newBlogs });
  //   },
  // });

  // const user = useSelector((state) => state.login);
  const user = useLoginValue();
  const loginDispatch = useLoginDispatch();

  const {
    data: blogs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    // enabled: !!user,
  });

  // const blogs = useSelector((state) => state.blogs);
  // const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  const blogFormRef = useRef();
  // const dispatch = useDispatch();

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
    if (loggedUserJSON) {
      try {
        const user = JSON.parse(loggedUserJSON);
        blogService.setToken(user.token);
        loginDispatch({ type: "SET_USER", payload: user });
      } catch {
        window.localStorage.removeItem("loggedInUser");
      }
    }
  }, [loginDispatch]);

  const handleLogout = () => {
    window.localStorage.clear();
    // dispatch(clearUser());
    loginDispatch({ type: "CLEAR_USER" });
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
    <Container>
      <Navbar expand="lg" className="mb-4 shadow-sm">
        <Container>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Blogs
            </Nav.Link>
            <Nav.Link as={Link} to="/users">
              Users
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto align-items-center">
            <Navbar.Text className="me-3">{user.name} is logged in</Navbar.Text>
            <Button variant="outline-danger" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>
      <h2>blog app</h2>
      <Notification />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <CreateForm blogFormRef={blogFormRef} />
              </Togglable>

              {!blogs || blogs.length === 0 ? (
                <p>No blogs</p>
              ) : (
                <Table striped bordered hover>
                  <tbody>
                    {blogs.map((blog) => (
                      <tr key={blog._id}>
                        <td>
                          <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </>
          }
        />
        <Route path="/blogs/:id" element={<BlogInfo />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserInfo />} />
      </Routes>
    </Container>
  );
}

export default App;
