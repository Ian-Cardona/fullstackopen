import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  };

  const user = {
    username: "tungtungtung",
    name: "sahur",
  };

  render(<Blog blog={blog} user={user} />);

  const element = screen.getByText(/React patterns/i);
  expect(element).toBeDefined();
});
