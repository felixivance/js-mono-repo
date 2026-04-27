// Single entry point for all shared types.
// Apps import like: import type { Todo } from "@todo-prep/proto"
export type {
  Todo,
  TodoStatus,
  TodoPriority,
  TodoFilter,
  CreateTodoRequest,
  UpdateTodoRequest,
  DeleteTodoRequest,
  GetTodosResponse,
} from "./todo";
