const Notification = ({ message, statusCode }) => {
  if (!message) {
    return null;
  }

  const isError = statusCode >= 400 && statusCode < 600;
  const errorStyle = isError ? "error" : "success";

  return <div className={errorStyle}>{message}</div>;
};

export default Notification;
