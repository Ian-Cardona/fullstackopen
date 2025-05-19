import loginService from "../services/login";
import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {},
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    clearUser(state, action) {
      return null;
    },
  },
});

export const { setUser, clearUser } = loginSlice.actions;

export const loginUser = (user) => async (dispatch) => {
  const response = await loginService.login(user);
  dispatch(setUser(response));
  return response;
};

export const logoutUser = () => (dispatch) => {
  dispatch(clearUser());
};

export default loginSlice.reducer;
