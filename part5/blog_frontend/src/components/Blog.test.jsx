import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  };

  render(<Blog blog={blog} />);

  const element = screen.getByText("React patterns");
  expect(element).toBeDefined();
});
