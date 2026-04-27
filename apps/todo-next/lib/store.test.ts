import { beforeEach, describe, expect, it } from 'vitest';
import { createTodo, deleteTodo, getTodos, updateTodo } from './store';

beforeEach(() => {
  // delete all existing todos before each test
  getTodos().forEach((todo) => deleteTodo(todo.id));
});

describe('Get Todos', () => {
  it('should return an empty array when there are no todos', () => {
    const todos = getTodos();
    expect(todos).toEqual([]);
  });

  it('should return todos after one is created', () => {
    createTodo({
      title: 'Test todo',
      priority: 'medium',
    });

    const todos = getTodos();
    expect(todos.length).toBe(1);
    expect(todos[0]?.title).toBe('Test todo');
  });
});

describe('Create Todo', () => {
  it('should create a new todo with the given title and priority', () => {
    const newTodo = createTodo({
      title: 'New test todo',
      priority: 'low',
    });

    expect(newTodo).toBeTruthy();
    expect(newTodo.title).toBe('New test todo');
    expect(newTodo.priority).toBe('low');
    expect(newTodo.status).toBe('pending');
    expect(newTodo.createdAt).toBeTruthy();
    expect(newTodo.completedAt).toBeNull();
  });

  it('should persist the new todo in the store', () => {
    const newTodo = createTodo({
      title: 'Another test todo',
      priority: 'high',
    });

    const todos = getTodos();
    expect(todos).toContainEqual(newTodo);
  });
});

describe('Delete Todo', () => {
  it('should delete a todo by id', () => {
    const newTodo = createTodo({
      title: 'Todo to be deleted',
      priority: 'medium',
    });

    deleteTodo(newTodo.id);

    const todos = getTodos();
    expect(todos).not.toContainEqual(newTodo);
  });

  it('should not throw an error if trying to delete a non-existent todo', () => {
    expect(() => deleteTodo('non-existent-id')).not.toThrow();
  });

  it('should not delete any todos if the id does not match', () => {
    const existingTodo = createTodo({
      title: 'Existing todo',
      priority: 'low',
    });

    deleteTodo('non-existent-id');
    const todos = getTodos();
    expect(todos).toContainEqual(existingTodo);
  });
});

describe('Update Todo', () => {
  it('should update the status of a todo', () => {
    const newTodo = createTodo({
      title: 'Todo to be updated',
      priority: 'medium',
    });

    const updatedTodo = updateTodo({
      id: newTodo.id,
      status: 'completed',
    });

    expect(updatedTodo.status).toBe('completed');
    expect(updatedTodo.completedAt).toBeTruthy();
  });

  it('should throw an error if trying to update a non-existent todo', () => {
    expect(() =>
      updateTodo({
        id: 'non-existent-id',
        status: 'completed',
      }),
    ).toThrow('Todo with non-existent-id not found');
  });
});
