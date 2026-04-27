import * as React from 'react';

type Props = {
  pendingTodosCount?: number;
  completedTodosCount?: number;
  allTodosCount?: number;
};

export function TodoStats({
  pendingTodosCount = 0,
  completedTodosCount = 0,
  allTodosCount = 0,
}: Props) {
  return (
    <div className="flex gap-4 mt-4 mb-2 border rounded-lg">
      <div className="px-4 py-2 ">Total Todos: {allTodosCount}</div>
      <div className="px-4 py-2 bg-green-200 text-green-700 rounded">
        Completed Todos: {completedTodosCount}
      </div>
      <div className="px-4 py-2 bg-yellow-200 text-yellow-700 rounded">
        Pending Todos: {pendingTodosCount}
      </div>
    </div>
  );
}
