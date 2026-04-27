'use client';

import type { Todo } from '@todo-prep/proto';
import { toggleTodoAction, deleteTodoAction } from '@/app/actions';
import { useState } from 'react';

export function TodoList({ todos }: { todos: Todo[] }) {
  if (todos.length === 0) return <p>No todos yet. Add one above.</p>;

  return (
    <ul
      style={{
        listStyle: 'none',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      {todos.map((todo) => (
        <li
          key={todo.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '10px 14px',
            borderRadius: 8,
            border: '1px solid #e0e0e0',
            opacity: todo.status === 'completed' ? 0.6 : 1,
          }}
        >
          <input
            data-testid={`toggle-todo-${todo.id}`}
            type="checkbox"
            checked={todo.status === 'completed'}
            onChange={() => toggleTodoAction(todo.id, todo.status)}
          />
          <span
            style={{
              flex: 1,
              textDecoration:
                todo.status === 'completed' ? 'line-through' : 'none',
            }}
          >
            {todo.title}
          </span>
          <span style={{ fontSize: 12, color: '#888' }}>{todo.priority}</span>

          <button
            id="delete-todo-btn"
            onClick={() => deleteTodoAction(todo.id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#e00',
              fontSize: 16,
            }}
          >
            ×
          </button>
        </li>
      ))}
    </ul>
  );
}
