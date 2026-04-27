import type { ActionFunctionArgs, MetaFunction } from 'react-router';
import { Form, useLoaderData } from 'react-router';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../lib/store';
import type { TodoPriority } from '@todo-prep/proto';

export const meta: MetaFunction = () => [{ title: 'Todo App — Remix' }];

// LOADER — runs on the server before the page renders
// Equivalent of a server component reading data in Next.js
export async function loader() {
  return { todos: getTodos() };
}

// ACTION — runs on the server when a form is submitted
// Equivalent of a server action in Next.js
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get('intent');

  if (intent === 'create') {
    const title = formData.get('title');
    const priority = formData.get('priority');
    if (typeof title !== 'string' || title.trim() === '') return null;
    if (typeof priority !== 'string') return null;
    createTodo({ title: title.trim(), priority: priority as TodoPriority });
  }

  if (intent === 'toggle') {
    const id = formData.get('id');
    const currentStatus = formData.get('currentStatus');
    if (typeof id !== 'string' || typeof currentStatus !== 'string')
      return null;
    updateTodo({
      id,
      status: currentStatus === 'completed' ? 'pending' : 'completed',
    });
  }

  if (intent === 'delete') {
    const id = formData.get('id');
    if (typeof id !== 'string') return null;
    deleteTodo(id);
  }

  return null;
}

// UI — uses useLoaderData to get data from the loader
export default function Index() {
  const { todos } = useLoaderData<typeof loader>();

  return (
    <main style={{ maxWidth: 600, margin: '40px auto', padding: '0 16px' }}>
      <h1>Todo App — Remix</h1>

      {/* Create form */}
      <Form method="post" style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <input type="hidden" name="intent" value="create" />
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
            background: '#e04e00',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Add
        </button>
      </Form>

      {/* Todo list */}
      {todos.length === 0 ? (
        <p>No todos yet. Add one above.</p>
      ) : (
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
              {/* Toggle form */}
              <Form method="post">
                <input type="hidden" name="intent" value="toggle" />
                <input type="hidden" name="id" value={todo.id} />
                <input type="hidden" name="currentStatus" value={todo.status} />
                <input
                  type="checkbox"
                  checked={todo.status === 'completed'}
                  onChange={(e) => e.currentTarget.form?.requestSubmit()}
                />
              </Form>

              <span
                style={{
                  flex: 1,
                  textDecoration:
                    todo.status === 'completed' ? 'line-through' : 'none',
                }}
              >
                {todo.title}
              </span>
              <span style={{ fontSize: 12, color: '#888' }}>
                {todo.priority}
              </span>

              {/* Delete form */}
              <Form method="post">
                <input type="hidden" name="intent" value="delete" />
                <input type="hidden" name="id" value={todo.id} />
                <button
                  type="submit"
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
              </Form>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
