import { Todo } from "@/model/todo.ts";
import { apiGet } from "@/backend/fetchFromApi.ts";

// Separate interface for the todo response, as it may be different from our core model
// Ideally, we would never write this interface ourselve, but rather generate it via
// tools like https://github.com/oazapfts/oazapfts
export interface TodoResponse {
  id: string;
  name: string;
  description: string;
}

export async function getTodo(id: string): Promise<Todo> {
  const response = await apiGet(`/todos/${encodeURIComponent(id)}`);
  return (await response.json()) as TodoResponse;
}
