import { createContext, useReducer } from "react";

const loginReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      console.log("payload", action.payload);
      return action.payload;
    case "CLEAR_USER":
      return null;
    default:
      return state;
  }
};

const LoginContext = createContext();

export const LoginContextProvider = (props) => {
  const [login, loginDispatch] = useReducer(loginReducer, {
    token: "",
    username: "",
    name: "",
  });

  return (
    <LoginContext.Provider value={[login, loginDispatch]}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
