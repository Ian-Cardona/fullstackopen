const Todo = ({
  todo,
  editingTodoId,
  editTodo,
  setEditTodo,
  onClickDelete,
  onClickComplete,
  onClickEdit,
  onSubmitEdit,
  onCancelEdit
}) => {
  const isEditingThisTodo = editingTodoId === todo._id;

  const doneInfo = (
    <>
      <span>This todo is done</span>
      <span>
        <button onClick={onClickEdit(todo)}> Edit </button>
        {
          !isEditingThisTodo ? <button onClick={onClickDelete(todo)}> Delete </button> : null
        }
      </span>
    </>
  )

  const notDoneInfo = (
    <>
      <span>
        This todo is not done
      </span>
      <span>
        <button onClick={onClickEdit(todo)}> Edit </button>
        {
          !isEditingThisTodo ? <button onClick={onClickDelete(todo)}> Delete </button> : null
        }
        <button onClick={onClickComplete(todo)}> Set as done </button>
      </span>
    </>
  )

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '70%', margin: 'auto' }} key={todo._id}>
      {
        isEditingThisTodo ? (
          <form onSubmit={onSubmitEdit(todo)} style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <input type="text" value={todo.text} disabled style={{ marginRight: '0.5rem' }} />
            <input
              type="text"
              placeholder="Edit notes"
              value={editTodo}
              onChange={e => setEditTodo(e.target.value)}
              style={{ marginRight: '0.5rem' }}
            />
            <button type="submit">Save</button>
            <button type="button" onClick={onCancelEdit}>Cancel</button>
          </form>
        ) : (
          <span>
            {todo.text}
            {todo.notes ? <span style={{ fontStyle: 'italic', color: '#888', marginLeft: '0.5rem' }}>{`Notes: ${todo.notes}`}</span> : null}
          </span>
        )
      }
      {!isEditingThisTodo && (todo.done ? doneInfo : notDoneInfo)}
    </div>
  )
}

export default Todo;