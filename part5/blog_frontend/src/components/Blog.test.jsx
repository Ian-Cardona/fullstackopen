import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import { expect, test } from "vitest";
import userEvent from "@testing-library/user-event";

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

  const titleAuthorElement = screen.getByText("React patterns Michael Chan");
  expect(titleAuthorElement).toBeDefined();

  // in the same element, maybe with a <br /> between them
  const urlLikesElement = screen.queryByText(
    (content) =>
      content.includes("https://reactpatterns.com/") &&
      content.includes("likes 7")
  );

  expect(urlLikesElement).not.toBeVisible();
});

test("display url and likes when button is clicked", async () => {
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

  const urlLikesElement = screen.queryByText(
    (content) =>
      content.includes("https://reactpatterns.com/") &&
      content.includes("likes 7")
  );

  expect(urlLikesElement).not.toBeVisible();

  const userEv = userEvent.setup();
  const button = screen.getByText("view");
  await userEv.click(button);

  expect(urlLikesElement).toBeVisible();
});
