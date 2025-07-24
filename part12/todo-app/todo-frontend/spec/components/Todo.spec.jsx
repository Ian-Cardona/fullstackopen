import { render, screen } from '@testing-library/react'
import { expect, test, vi, describe } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
import Todo from '../../src/Todos/Todo'

expect.extend(matchers)

describe('Todo Component', () => {
  const mockTodo = {
    _id: '123',
    text: 'Learn Docker',
    notes: 'Important for deployment',
    done: false
  }

  const defaultProps = {
    todo: mockTodo,
    editingTodoId: null,
    editTodo: '',
    setEditTodo: vi.fn(),
    onClickDelete: vi.fn(() => vi.fn()),
    onClickComplete: vi.fn(() => vi.fn()),
    onClickEdit: vi.fn(() => vi.fn()),
    onSubmitEdit: vi.fn(() => vi.fn()),
    onCancelEdit: vi.fn()
  }

  test('renders todo text and notes', () => {
    render(<Todo {...defaultProps} />)
    
    expect(screen.getByText('Learn Docker')).toBeInTheDocument()
    expect(screen.getByText('Notes: Important for deployment')).toBeInTheDocument()
  })
})