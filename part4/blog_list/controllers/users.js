const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/api/users", async (request, response, next) => {
  const user = new User(request.body);
  try {
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
