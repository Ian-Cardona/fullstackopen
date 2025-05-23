import PropTypes from "prop-types";
// import { useDispatch } from "react-redux";
// import { loginUser } from "../reducers/loginReducer";
import blogService from "../services/blogs";
import { useState } from "react";
import { useLoginDispatch } from "../hooks/useLogin";
import loginService from "../services/login";
import { useMutation } from "@tanstack/react-query";
import { Form, Button, Alert } from "react-bootstrap";

const LoginForm = () => {
  // const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const loginDispatch = useLoginDispatch();
  const loginMutation = useMutation({
    mutationFn: loginService.login,
    onSuccess: (loggedInUser) => {
      loginDispatch({ type: "SET_USER", payload: loggedInUser });
      window.localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      blogService.setToken(loggedInUser.token);
      setUsername("");
      setPassword("");
    },
    onError: (error) => {
      const errorMsg = error.response
        ? error.response.data.error
        : "Something went wrong";
      setErrorMessage(errorMsg);
      setTimeout(() => setErrorMessage(null), 5000);
    },
  });

  const handleLogin = (event) => {
    event.preventDefault();
    loginMutation.mutate({ username, password });
  };

  const handleUsernameChange = (value) => {
    setUsername(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  return (
    <div className="mt-4" style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Log in to application</h2>
      {errorMessage && (
        <Alert variant="danger" className="mt-3">
          {errorMessage}
        </Alert>
      )}
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="login-username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            data-testid="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => handleUsernameChange(target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="login-password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            data-testid="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => handlePasswordChange(target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          login
        </Button>
      </Form>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
};

export default LoginForm;
