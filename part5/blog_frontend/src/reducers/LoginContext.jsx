import { createContext, useReducer } from "react";

const loginReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
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
    <NotificationContext.Provider value={[login, loginDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default LoginContext;
