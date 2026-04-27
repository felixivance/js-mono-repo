'use client';

import { useRef } from 'react';
import { createTodoAction } from '@/app/actions';

export function TodoForm() {
  const ref = useRef<HTMLFormElement>(null);

  return (
    <form
      action={async (formData) => {
        await createTodoAction(formData);
        ref.current?.reset();
      }}
      ref={ref}
      style={{ display: 'flex', gap: 8, marginBottom: 24 }}
    >
      <input
        name="title"
        placeholder="What needs doing?"
        required
        style={{
          flex: 1,
          padding: '8px 12px',
          borderRadius: 6,
          border: '1px solid #ccc',
        }}
      />
      <select
        name="priority"
        style={{
          padding: '8px 12px',
          borderRadius: 6,
          border: '1px solid #ccc',
        }}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button
        data-testid="add-todo-btn"
        type="submit"
        style={{
          padding: '8px 16px',
          borderRadius: 6,
          background: '#0070f3',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Add
      </button>
    </form>
  );
}
