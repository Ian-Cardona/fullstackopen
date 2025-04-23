const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
// const blogsRouter = require("../controllers/blogs");
const helper = require("./test_helper");
const blogs = helper.initialBlogs;

test("dummy returns one", () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  test("Total of 36 likes", () => {
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 36);
  });

  test("of empty array is zero", () => {
    const result = listHelper.totalLikes([]);
    assert.strictEqual(result, 0);
  });
});

describe("favorite blog", () => {
  test("Favorite blog is here", () => {
    const result = listHelper.favoriteBlog(blogs);
    assert.deepStrictEqual(result, blogs[2]);
  });

  test("of empty array is zero", () => {
    const result = listHelper.favoriteBlog([]);
    assert.strictEqual(result, null);
  });
});

describe("most blogs", () => {
  test("Most blogs is", () => {
    const result = listHelper.mostBlogs(blogs);

    assert.deepStrictEqual(result, { author: "Robert C. Martin", blogs: 3 });
  });

  test("of empty array is zero", () => {
    const result = listHelper.mostBlogs([]);
    assert.strictEqual(result, null);
  });
});

describe("most likes", () => {
  test("Most blogs is", () => {
    const result = listHelper.mostLikes(blogs);

    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });

  test("of empty array is zero", () => {
    const result = listHelper.mostLikes([]);
    assert.strictEqual(result, null);
  });
});
