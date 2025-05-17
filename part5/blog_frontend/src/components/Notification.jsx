import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification.statusCode === 0) {
    return null;
  }

  const isError =
    notification.statusCode >= 400 && notification.statusCode < 600;
  const notificationStyle = isError ? "error" : "success";

  return <div className={notificationStyle}>{notification.message}</div>;
};

export default Notification;
