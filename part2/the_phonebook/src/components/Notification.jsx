const Notification = ({ message }) => {
  if (!message) {
    return null;
  }

  const errorStyle = {
    color: message.includes("removed") ? "red" : "green",
  };

  return (
    <div className="error" style={errorStyle}>
      {message}
    </div>
  );
};

export default Notification;
