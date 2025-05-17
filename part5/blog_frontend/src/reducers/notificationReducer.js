import { createSlice } from "@reduxjs/toolkit";
const initialState = { message: "", statusCode: 0 };

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(_, action) {
      return action.payload;
    },
    clearNotification() {
      return initialState;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const showNotification =
  (message, statusCode, durationInSeconds = 10) =>
  (dispatch) => {
    dispatch(setNotification({ message, statusCode }));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 1000 * durationInSeconds);
  };

export default notificationSlice.reducer;
