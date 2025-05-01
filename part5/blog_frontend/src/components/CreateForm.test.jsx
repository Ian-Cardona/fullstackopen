import { expect, test, vi } from "vitest";
import CreateForm from "./CreateForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("create new blog via form", async () => {
  const mockHandleCreate = vi.fn();

  const { container } = render(<CreateForm handleCreate={mockHandleCreate} />);

  const userEv = userEvent.setup();
  const titleField = container.querySelector("#cb-title-field");
  const authorField = container.querySelector("#cb-author-field");
  const urlField = container.querySelector("#cb-url-field");
  const submitButton = screen.getByText("create");

  await userEv.type(titleField, "Drain Gang Blog 2025");
  await userEv.type(authorField, "Benjamin Reichwald");
  await userEv.type(urlField, "https://draingang.com");

  await userEv.click(submitButton);

  console.log(mockHandleCreate.mock.calls);

  expect(mockHandleCreate.mock.calls).toHaveLength(1);

  expect(mockHandleCreate.mock.calls[0][0]).toEqual({
    title: "Drain Gang Blog 2025",
    author: "Benjamin Reichwald",
    url: "https://draingang.com",
  });
});
