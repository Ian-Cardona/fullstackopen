import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotifications(state, action) {
      return action.payload;
    },
    clearNotifications() {
      return "";
    },
  },
});

const showNotification = (message) => {
  return (dispatch) => {
    dispatch(setNotifications(message));
    setTimeout(() => {
      dispatch(clearNotifications());
    }, 5000);
  };
};

export const { setNotifications, clearNotifications } =
  notificationSlice.actions;
export { showNotification };

export default notificationSlice.reducer;
