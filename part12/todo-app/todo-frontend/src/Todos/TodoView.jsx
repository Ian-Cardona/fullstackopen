import { useEffect, useState } from 'react'
import axios from '../util/apiClient'

import List from './List'
import Form from './Form'

const TodoView = () => {
  const [todos, setTodos] = useState([])

  const refreshTodos = async () => {
    const { data } = await axios.get('/todos')
    setTodos(data)
  }

  useEffect(() => {
    refreshTodos()
  }, [])

  // const getTodoById = async (id) => {
  //   const { data } = await axios.get('/todos/:id', id)
  //   setTodos(data)
  // }

  const createTodo = async (todo) => {
    const { data } = await axios.post('/todos', todo)
    setTodos([...todos, data])
  }

  const updateTodo = async (todo) => {
    await axios.put(`/todos/${todo._id}`, todo)
  }

  const deleteTodo = async (todo) => {
    await axios.delete(`/todos/${todo._id}`)
    refreshTodos()
  }

  const completeTodo = async (todo) => {
    await axios.put(`/todos/${todo._id}`, {
      text: todo.text,
      done: true
    })
    refreshTodos()
  }
  
  return (
    <>
      <h1>Todos</h1>
      <Form createTodo={createTodo} />
      <List todos={todos} deleteTodo={deleteTodo} completeTodo={completeTodo} updateTodo={updateTodo}/>
    </>
  )
}

export default TodoView
