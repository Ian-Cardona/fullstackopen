const { describe, beforeEach, test, expect } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Ian Cardona",
        username: "iancardona",
        password: "iancardona123",
      },
    });

    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    const titleLocator = await page.getByText("Log in to application");
    const usernameLocator = await page.getByText("username");
    const passwordLocator = await page.getByText("password");

    await expect(titleLocator).toBeVisible();
    await expect(usernameLocator).toBeVisible();
    await expect(passwordLocator).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByTestId("username").fill("iancardona");
      await page.getByTestId("password").fill("iancardona123");
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("Ian Cardona is logged in")).toBeVisible();
    });

    test("fails with incorrect credentials", async ({ page }) => {
      await page.getByTestId("username").fill("iancardong");
      await page.getByTestId("password").fill("iancardona123");
      await page.getByRole("button", { name: "login" }).click();

      await expect(
        page.getByText("Ian Cardona is logged in")
      ).not.toBeVisible();
    });
  });
});
