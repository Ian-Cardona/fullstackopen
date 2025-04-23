const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/api/blogs", (request, response) => {
  console.log("Fetching all blogs");
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.get("/api/blogs/:id", (request, response, next) => {
  Blog.findById(request.params.id)
    .then((blog) => {
      if (blog) {
        response.json(blog);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

blogsRouter.post("/api/blogs", (request, response, next) => {
  console.log(request.body);
  const blog = new Blog(request.body);
  console.log("Posting a new blog", blog);

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((error) => next(error));
});

blogsRouter.delete("/api/blogs/:id", async (request, response, _) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

module.exports = blogsRouter;
