import { getTodos } from '@/lib/store';
import { TodoView } from '@/components/TodoView';

export default function Home() {
  const todos = getTodos();

  return (
    <main style={{ maxWidth: 600, margin: '40px auto', padding: '0 16px' }}>
      <h1>Todo App — Next.js</h1>
      <TodoView todos={todos} />
    </main>
  );
}
