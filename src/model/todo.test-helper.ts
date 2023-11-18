import { Todo } from "@/model/todo.ts";
import { nanoid } from "nanoid";

// Test helpers like this are helpful because
// - you don't always have to specify the full data in each test,
//   but you should still specify all the data the your are using in the test
// - when the model interface expands (new fields come in, structure changes),
//   you can more easily adapt.
export function createTodo(todo: Partial<Todo> = {}): Todo {
  return {
    id: nanoid(6),
    name: "default name",
    description: "default description",
    ...todo,
  };
}
