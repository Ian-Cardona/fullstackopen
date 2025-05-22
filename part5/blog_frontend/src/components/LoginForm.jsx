import PropTypes from "prop-types";
// import { useDispatch } from "react-redux";
// import { loginUser } from "../reducers/loginReducer";
import blogService from "../services/blogs";
import { useState } from "react";
import { useLoginDispatch } from "../hooks/useLogin";
import loginService from "../services/login";
import { useMutation } from "@tanstack/react-query";

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
    <div>
      <h2>Log in to application</h2>
      {errorMessage && (
        <div style={{ color: "red", marginBottom: "10px" }}>{errorMessage}</div>
      )}
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            data-testid="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => handleUsernameChange(target.value)}
          />
        </div>
        <div>
          password
          <input
            data-testid="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => handlePasswordChange(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
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
