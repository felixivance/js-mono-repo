type Props = {
  filterTodos: (filterString: string) => void;
};

export function TodoFilter({ filterTodos }: Props) {
  return (
    // create 3 buttons to filter the todos by status: All, Pending, Completed using typescript and tailwindcss
    <div className="flex gap-4 my-2">
      <button
        className="px-4 py-1 bg-blue-500 text-white rounded"
        onClick={() => filterTodos('all')}
      >
        All
      </button>
      <button
        className="px-4 py-1 bg-gray-300 text-gray-700 rounded"
        onClick={() => filterTodos('pending')}
      >
        Pending
      </button>
      <button
        className="px-4 py-1 bg-green-500 text-white rounded"
        onClick={() => filterTodos('completed')}
      >
        Completed
      </button>
    </div>
  );
}
