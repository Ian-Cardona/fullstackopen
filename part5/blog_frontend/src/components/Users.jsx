import { useQuery } from "@tanstack/react-query";
import usersService from "../services/users";
import { Link } from "react-router-dom";
import { Table, Spinner, Alert } from "react-bootstrap";

const Users = () => {
  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: usersService.getUsers,
  });

  if (isLoading)
    return (
      <Spinner animation="border" role="status" size="sm">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  if (isError) return <Alert variant="danger">Error loading users</Alert>;

  return (
    <div className="mt-4">
      <h2>Users</h2>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
