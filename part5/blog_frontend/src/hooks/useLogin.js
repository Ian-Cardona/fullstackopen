import { useContext } from "react";
import LoginContext from "../reducers/LoginContext";

export const useLoginValue = () => {
  const loginAndDispatch = useContext(LoginContext);
  return loginAndDispatch[0];
};

export const useLoginDispatch = () => {
  const loginAndDispatch = useContext(LoginContext);
  return loginAndDispatch[1];
};
