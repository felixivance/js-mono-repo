import type {
  Todo,
  CreateTodoRequest,
  UpdateTodoRequest,
} from '@todo-prep/proto';

import { randomUUID } from 'crypto';

let todos: Todo[] = [
  {
    id: randomUUID(),
    title: 'Learn pnpm workspaces',
    status: 'completed',
    priority: 'high',
    createdAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
  },
  {
    id: randomUUID(),
    title: 'Build the Next.js todo app',
    status: 'pending',
    priority: 'high',
    createdAt: new Date().toISOString(),
    completedAt: null,
  },
];

export function getTodos(): Todo[] {
  return todos;
}

export function createTodo(request: CreateTodoRequest): Todo {
  const newTodo: Todo = {
    id: randomUUID(),
    title: request.title,
    status: 'pending',
    priority: request.priority,
    createdAt: new Date().toISOString(),
    completedAt: null,
  };
  todos.push(newTodo);
  return newTodo;
}

export function updateTodo(req: UpdateTodoRequest): Todo {
  todos = todos.map((t) => {
    if (t.id !== req.id) return t; // if the id doesn't match, return the original todo
    return {
      ...t,
      ...req,
      completedAt: req.status === 'completed' ? new Date().toISOString() : null, // set completedAt if status is completed, otherwise set it to null
    };
  });

  const updatedTodo = todos.find((t) => t.id === req.id);
  if (!updatedTodo) {
    throw new Error(`Todo with non-existent-id not found`);
  }
  return updatedTodo;
}

export function deleteTodo(id: string): void {
  todos = todos.filter((t) => t.id !== id);
}
