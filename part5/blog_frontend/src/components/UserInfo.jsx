import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const UserInfo = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const users = queryClient.getQueryData(["users"]) || [];

  const user = users.find((u) => u.id === id);

  if (!user) return null;

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      {user.blogs.map((blog) => (
        <li>{blog.title}</li>
      ))}
    </div>
  );
};

export default UserInfo;
