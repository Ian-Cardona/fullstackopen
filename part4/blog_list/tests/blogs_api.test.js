const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const assert = require("node:assert");
const Blog = require("../models/blog");
const helper = require("./test_helper");

const api = supertest(app);
describe("when there is initially some blogs saved", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  });

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const blogs = await helper.blogsInDb();

    assert.strictEqual(blogs.length, helper.initialBlogs.length);
  });

  test("a specific blog is within the returned blogs", async () => {
    const blogs = await helper.blogsInDb();

    const titles = blogs.map((e) => e.title);
    assert(titles.includes("Go To Statement Considered Harmful"));
  });

  describe("viewing a specific blog", () => {
    test("succeeds with a valid id", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToView = blogsAtStart[0];

      const resultBlog = await api
        .get(`/api/blogs/${blogToView._id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      assert.strict(resultBlog.body, blogToView);
    });

    test("fails with statuscode 404 if blog does not exist", async () => {
      const validNonexistingId = await helper.nonExistingId();

      await api.get(`/api/blogs/${validNonexistingId}`).expect(404);
    });

    test("fails with statuscode 400 id is invalid", async () => {
      const invalidId = "5a3d5da59070081a82a3445";

      await api.get(`/api/blogs/${invalidId}`).expect(400);
    });
  });

  test("a valid blog can be added ", async () => {
    const newBlog = {
      title: "This is a sample blog",
      author: "Ian N. Cardona",
      url: "https://drainggang.com.ph",
      likes: 5,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((r) => r.title);
    assert(titles.includes("This is a sample blog"));
  });

  describe("addition of a new blog", () => {
    test("succeeds with valid data", async () => {
      const newBlog = {
        title: "This is my new blog!",
        author: "Ian N. Cardona",
        url: "https://iancardona.io",
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

      const contents = blogsAtEnd.map((n) => n.title);
      assert(contents.includes("This is my new blog!"));
    });

    test("fails with status code 400 if data invalid", async () => {
      const newBlog = { title: true };

      await api.post("/api/blogs").send(newBlog).expect(400);

      const blogsAtEnd = await helper.blogsInDb();

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
    });
  });

  describe.only("deletion of a blog", () => {
    test("succeeds with status code 204 if id is valid", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      await api.delete(`/api/blogs/${blogToDelete._id.toString()}`).expect(204);

      const blogsAtEnd = await helper.blogsInDb();

      const titles = blogsAtEnd.map((n) => n.title);
      assert(!titles.includes(blogToDelete.title));

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);
    });
  });

  // test("all blogs are returned from API", async () => {
  //   const response = await api.get("/api/blogs");

  //   assert.strictEqual(response.body.length, helper.initialBlogs.length);
  // });

  // test("blog without title is not added", async () => {
  //   const newBlog = {
  //     author: "Invalid Author",
  //     url: "https://invalidurl.com",
  //     likes: 0,
  //   };

  //   await api.post("/api/blogs").send(newBlog).expect(400);

  //   const blogsAtEnd = await helper.blogsInDb();

  //   assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
  // });

  test("blog without likes will default to zero", async () => {
    const newBlog = {
      title: "No likes",
      author: "No likes Author",
      url: "https://nolikesurl.com",
    };

    const request = await api.post("/api/blogs").send(newBlog);

    assert.strictEqual(request.statusCode, 201);
  });
});

after(async () => {
  await mongoose.connection.close();
});
