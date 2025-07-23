import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Todo from '../src/Todos/Todo';

describe('Todo component', () => {
  it('renders Todo and checks if it exists and how many', () => {
    const mockProps = {
      todo: { _id: '1', text: 'Todo test for FSO 12.14', notes: 'Hi!', done: false },
      editingTodoId: null,
      editTodo: '',
      setEditTodo: () => {},
      onClickDelete: () => {},
      onClickComplete: () => {},
      onClickEdit: () => {},
      onSubmitEdit: () => {},
      onCancelEdit: () => {},
    };
    
    render(<Todo {...mockProps} />);
    
    screen.getByText('Todo test for FSO 12.14');
    
    expect(screen.getAllByText('Todo test for FSO 12.14')).toHaveLength(1);
  });
});