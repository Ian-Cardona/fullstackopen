const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (_, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogsRouter.get(
  "/:id",
  middleware.userExtractor,
  async (request, response, next) => {
    try {
      const blog = await Blog.findById(request.params.id);
      if (blog) {
        response.json(blog);
      } else {
        response.status(404).end();
      }
    } catch (error) {
      next(error);
    }
  }
);

blogsRouter.post(
  "/",
  middleware.userExtractor,
  async (request, response, next) => {
    try {
      const body = request.body;
      const user = request.user;

      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user.id,
      });

      const result = await blog.save();
      user.blogs = user.blogs.concat(result._id);
      await user.save();

      response.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
);

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response, next) => {
    try {
      const user = request.user;

      console.log("user", user);

      const blog = await Blog.findById(request.params.id);
      if (!blog) {
        return response.status(404).json({ error: "blog not found" });
      }

      console.log("blog", blog);

      if (blog.user.toString() !== user._id.toString()) {
        return response.status(401).json({ error: "not authorized" });
      }

      await Blog.findByIdAndDelete(request.params.id);
      response.status(204).end();
    } catch (error) {
      next(error);
    }
  }
);

module.exports = blogsRouter;
