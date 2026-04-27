'use client';

import { useState } from 'react';
import type { Todo } from '@todo-prep/proto';
import { TodoForm } from '@/components/TodoForm';
import { TodoList } from '@/components/TodoList';

import { TodoStats, TodoFilterComponent } from '@todo-prep/ui';

export function TodoView({ todos }: { todos: Todo[] }) {
  const [filterBy, setFilterBy] = useState<'all' | 'pending' | 'completed'>(
    'all',
  );

  const filteredTodos =
    filterBy === 'all' ? todos : todos.filter((t) => t.status === filterBy);

  const pendingCount = todos.filter((t) => t.status === 'pending').length;

  const completedCount = todos.filter((t) => t.status === 'completed').length;

  return (
    <div className="flex flex-col gap-4">
      <TodoStats
        pendingTodosCount={pendingCount}
        completedTodosCount={completedCount}
        allTodosCount={todos.length}
      />
      <TodoFilterComponent filterTodos={(text) => setFilterBy(text)} />
      <TodoForm />
      <TodoList todos={filteredTodos} />
    </div>
  );
}
