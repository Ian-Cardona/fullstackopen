const express = require('express');
const { Todo } = require('../mongo');
const { setAsync, getAsync } = require('../redis');
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  const counter = await getAsync("added_todos")
  console.log('Current counter before increment:', counter)
    
  const currentCount = counter ? parseInt(counter, 10) : 0
  const newCount = currentCount + 1
  
  await setAsync("added_todos", newCount.toString())
  console.log('Counter incremented to:', newCount)
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.deleteOne()
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(
    req.todo._id, 
    req.body, 
    { new: true }
  );
  res.send(updatedTodo);
});

//changes to the file

router.use('/:id', findByIdMiddleware, singleRouter)

module.exports = router;