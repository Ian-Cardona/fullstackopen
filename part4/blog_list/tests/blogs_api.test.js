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
    await Blog.insertMany(helper.initialNotes);
  });

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
    console.log(blogs.body);

    const titles = blogs.map((e) => e.title);
    assert(titles.includes("Go To Statement Considered Harmful"));
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, helper.initialBlogs.length);
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

  test("blog without title is not added", async () => {
    const newBlog = {
      author: "Invalid Author",
      url: "https://invalidurl.com",
      likes: 0,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
  });

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
