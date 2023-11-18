import { Todo } from "@/model/todo.ts";
import { Ref, ref } from "vue";
import { nanoid } from "nanoid";

const todos = ref<Todo[]>([]);

export function getTodos(): Readonly<Ref<Readonly<Todo[]>>> {
  return todos;
}

export function updateTodo(todo: Todo): void {
  for (let i = 0; i < todos.value.length; i++) {
    if (todos.value[i].id === todo.id) {
      todos.value[i] = todo;
    }
  }
}

export function addNewTodo(values: Partial<Omit<Todo, "id">> = {}): Todo {
  const newTodo = {
    id: nanoid(),
    name: "",
    description: "",
    ...values,
  };
  todos.value.push(newTodo);
  return newTodo;
}

export function initTodosForTest(initialTodos: Todo[] = []): void {
  todos.value = initialTodos;
}
