const express = require('express');
const router = express.Router();

const configs = require('../util/config')

const { getAsync } = require('../redis');

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics/', async (_, res) => {
  const counter = await getAsync("added_todos")
  console.log('Current counter:', counter)
  
  const todoCount = counter ? parseInt(counter, 10) : 0
  
  res.send({
    "added_todos": todoCount
  });
});

module.exports = router;
