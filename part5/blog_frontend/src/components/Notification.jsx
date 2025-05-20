import { useNotificationValue } from "../hooks/useNotification";
// import { useSelector } from "react-redux";

const Notification = () => {
  // const notification = useSelector((state) => state.notification);
  const notification = useNotificationValue();
  console.log("notif", notification);

  if (notification.statusCode === 0) {
    return null;
  }
  const isError =
    notification.statusCode >= 400 && notification.statusCode < 600;

  return (
    <div className={isError ? "error" : "success"}>{notification.message}</div>
  );
};

export default Notification;
