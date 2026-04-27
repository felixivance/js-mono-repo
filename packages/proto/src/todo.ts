// ============================================================
// packages/proto/src/todo.ts
// Shared type definitions — both apps import from here.
// In a real app with gRPC/protobuf, these would be generated
// from .proto files. Here we define them manually in TS.
// ============================================================

export type TodoStatus = "pending" | "completed";

export type TodoPriority = "low" | "medium" | "high";

export interface Todo {
  id: string;
  title: string;
  status: TodoStatus;
  priority: TodoPriority;
  createdAt: string; // ISO 8601
  completedAt: string | null;
}

// ---- Request / Response shapes (mimics proto messages) ----

export interface CreateTodoRequest {
  title: string;
  priority: TodoPriority;
}

export interface UpdateTodoRequest {
  id: string;
  title?: string;
  status?: TodoStatus;
  priority?: TodoPriority;
}

export interface DeleteTodoRequest {
  id: string;
}

export interface GetTodosResponse {
  todos: Todo[];
}

// ---- UI helper types ----

export type TodoFilter = "all" | TodoStatus;
