const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/api/blogs", (request, response) => {
  console.log("Fetching all blogs");
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post("/api/blogs", (request, response, next) => {
  const blog = new Blog(request.body);
  console.log("Posting a new blog", blog);

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((error) => next(error));
});

module.exports = blogsRouter;
