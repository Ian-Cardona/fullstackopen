const { test, expect, beforeEach, describe } = require("@playwright/test");

const BASE_URL = "http://localhost:5173";
const API_URL = "http://localhost:3003/api";

const testUserOne = {
  name: "Ian Cardona",
  username: "iancardona",
  password: "iancardona123",
};

const testUserTwo = {
  name: "Ian M",
  username: "ianm",
  password: "ianm123",
};

const testBlog = {
  title: "My First Blog",
  author: "Nai Anodrac",
  url: "https://iancardona.com",
};

const testBlogTwo = {
  title: "My Second Blog",
  author: "James Two",
  url: "https://jamestwo.com",
};

async function goToApp(page) {
  await page.goto(BASE_URL);
}

async function login(page, user) {
  await page.getByTestId("username").fill(user.username);
  await page.getByTestId("password").fill(user.password);
  await page.getByRole("button", { name: /login/i }).click();
}

async function logout(page) {
  await page.getByRole("button", { name: /logout/i }).click();
}

async function createBlog(page, blog) {
  await page.getByRole("button", { name: /new blog/i }).click();
  const [titleInput, authorInput, urlInput] = await page
    .getByRole("textbox")
    .all();
  await titleInput.fill(blog.title);
  await authorInput.fill(blog.author);
  await urlInput.fill(blog.url);
  await page.getByRole("button", { name: /create/i }).click();
  await page.waitForSelector(`text=${blog.title} ${blog.author}`);
}

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post(`${API_URL}/testing/reset`);
    await request.post(`${API_URL}/users`, { data: testUserOne });
    await request.post(`${API_URL}/users`, { data: testUserTwo });
    await goToApp(page);
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("Log in to application")).toBeVisible();
    await expect(page.getByText("username")).toBeVisible();
    await expect(page.getByText("password")).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await login(page, testUserOne);
      await expect(
        page.getByText(`${testUserOne.name} is logged in`)
      ).toBeVisible();
    });

    test("fails with incorrect credentials", async ({ page }) => {
      await page.getByTestId("username").fill(testUserTwo.username);
      await page.getByTestId("password").fill(testUserOne.password);
      await page.getByRole("button", { name: "login" }).click();

      await expect(
        page.locator(`text=${testUserOne.name} is logged in`)
      ).toHaveCount(0);
      await expect(page.getByText(/invalid/i)).toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await login(page, testUserOne);
    });

    test("a new blog can be created", async ({ page }) => {
      await createBlog(page, testBlog);
      await expect(
        page.getByText(`${testBlog.title} ${testBlog.author}`)
      ).toBeVisible();
    });

    test("a blog can be liked", async ({ page }) => {
      await createBlog(page, testBlog);
      await page.getByRole("button", { name: "view" }).click();

      const likeButton = page.getByRole("button", { name: "like" });
      await expect(page.getByText("likes 0")).toBeVisible();
      await likeButton.click();
      await expect(page.getByText("likes 1")).toBeVisible();
    });

    describe("Removing blogs", () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, testBlog);
      });

      test("a blog can be removed", async ({ page }) => {
        await page.getByRole("button", { name: "view" }).click();

        page.once("dialog", async (dialog) => {
          expect(dialog.type()).toBe("confirm");
          await dialog.accept();
        });

        await page.getByRole("button", { name: "remove" }).click();
        await expect(
          page.getByText(`${testBlog.title} ${testBlog.author}`)
        ).not.toBeVisible();
      });

      test("a blog cannot be removed by another user", async ({ page }) => {
        await logout(page);
        await login(page, testUserTwo);

        await page.getByRole("button", { name: "view" }).click();
        await expect(
          page.getByRole("button", { name: "remove" })
        ).not.toBeVisible();
      });
    });

    describe("Checking likes order", () => {
      beforeEach(async ({ page, request }) => {
        await createBlog(page, testBlog);
        await createBlog(page, testBlogTwo);
      });
      test("checking likes order", async ({ page }) => {
        const viewClicker = await page
          .getByRole("button", { name: "view" })
          .all();

        await viewClicker[0].click();
        await viewClicker[0].click();
        let blogs = await page.getByTestId("blog").all();
        await blogs[1].getByRole("button", { name: "like" }).click();
        await page.waitForTimeout(500);
        await blogs[0].getByRole("button", { name: "like" }).click();
        await page.waitForTimeout(500);
        await blogs[0].getByRole("button", { name: "like" }).click();
        await page.waitForTimeout(500);
        await blogs[1].getByRole("button", { name: "like" }).click();
        await page.waitForTimeout(500);
        await blogs[1].getByRole("button", { name: "like" }).click();
        await page.waitForTimeout(500);
        await blogs[1].getByRole("button", { name: "like" }).click();
        await page.waitForTimeout(500);
        await blogs[1].getByRole("button", { name: "like" }).click();
        await page.waitForTimeout(500);

        const likes = await Promise.all(
          blogs.map(async (blog) => {
            const text = await blog.textContent();
            const match = text.match(/likes (\d+)/);
            return match ? parseInt(match[1], 10) : 0;
          })
        );

        for (let i = 0; i < likes.length - 1; i++) {
          expect(likes[i]).toBeGreaterThanOrEqual(likes[i + 1]);
        }
      });
    });
  });
});
