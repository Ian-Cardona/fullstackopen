import { useState } from "react"
import Todo from "./Todo";

const TodoList = ({ todos, deleteTodo, completeTodo, updateTodo }) => {
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editTodo, setEditTodo] = useState("");

  const onClickDelete = (todo) => () => {
    deleteTodo(todo)
  }

  const onClickComplete = (todo) => () => {
    completeTodo(todo)
  }

  const onClickEdit = (todo) => () => {
    setEditingTodoId(todo._id);
    setEditTodo(todo.notes || "");
  }

  const onSubmitEdit = (todo) => (e) => {
    e.preventDefault();
    updateTodo({ ...todo, text: editTodo });
    setEditingTodoId(null);
    setEditTodo("");
  }

  const onCancelEdit = () => {
    setEditingTodoId(null);
    setEditTodo("");
  }

  return (
    <>
      {todos.map((todo) => (
        <Todo
          key={todo._id}
          todo={todo}
          editingTodoId={editingTodoId}
          editTodo={editTodo}
          setEditTodo={setEditTodo}
          onClickDelete={onClickDelete}
          onClickComplete={onClickComplete}
          onClickEdit={onClickEdit}
          onSubmitEdit={onSubmitEdit}
          onCancelEdit={onCancelEdit}
        />
      )).reduce((acc, cur, idx) => {
        if (idx === 0) return [cur];
        return [...acc, <hr key={`hr-${idx}`} />, cur];
      }, [])}
    </>
  )
}

export default TodoList