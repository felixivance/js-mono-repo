'use server';

import { createTodo, deleteTodo, updateTodo } from '@/lib/store';
import { TodoPriority } from '@todo-prep/proto';
import { revalidatePath } from 'next/cache';

export async function createTodoAction(formData: FormData) {
  const title = formData.get('title') as string;
  const priority = formData.get('priority') as string;

  if (!title || !priority) {
    throw new Error('Title and priority are required');
  }

  createTodo({
    title: title.trim(),
    priority: priority as TodoPriority,
  });

  revalidatePath('/'); // revalidate the home page to show the new todo
}

export async function toggleTodoAction(id: string, currentStatus: string) {
  updateTodo({
    id,
    status: currentStatus === 'pending' ? 'completed' : 'pending',
  });
  revalidatePath('/'); // revalidate the home page to show the updated todo
}

export async function deleteTodoAction(id: string) {
  deleteTodo(id);
  revalidatePath('/'); // revalidate the home page to show the updated todo
}
