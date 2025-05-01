import { render } from "@testing-library/react";
import BlogDetails from "./BlogDetails";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";

test("like button is clicked twice", async () => {
  const blog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    user: { name: "sahur" },
  };

  const user = {
    username: "tungtungtung",
    name: "sahur",
  };

  const mockOnLikeHandler = vi.fn();

  const container = render(
    <BlogDetails blog={blog} user={user} likes={7} onLike={mockOnLikeHandler} />
  ).container;

  const userEv = userEvent.setup();
  const likeButton = container.querySelector(".button-like");
  await userEv.click(likeButton);
  await userEv.click(likeButton);

  console.log(mockOnLikeHandler.mock.calls);

  expect(mockOnLikeHandler.mock.calls).lengthOf(2);
});
