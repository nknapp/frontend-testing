import { beforeEach, describe, expect, it } from "vitest";
import {
  addNewTodo,
  initTodosForTest,
  getTodos,
  updateTodo,
} from "@/store/todoStore.ts";
import { Todo } from "@/model/todo.ts";
import { nextTick } from "vue";
import { gatherDeepUpdates } from "@/test-utils/reactivity.test-helper.ts";

beforeEach(() => {
  initTodosForTest();
});

describe("todo-store", () => {
  it("is initially empty", () => {
    expect(getTodos().value).toHaveLength(0);
  });

  it("an added todo is returned", () => {
    const todo1 = addNewTodo();
    const todo2 = addNewTodo();
    expect(getTodos().value).toEqual([todo1, todo2]);
  });

  it("add todos with default values", () => {
    addNewTodo({ name: "name", description: "description" });
    expect(getTodos().value).toEqual([
      expect.objectContaining({
        name: "name",
        description: "description",
      }),
    ]);
  });

  it("adding is reactive", async () => {
    const updates = gatherDeepUpdates(getTodos().value);
    const todo1 = addNewTodo();
    await nextTick();
    const todo2 = addNewTodo();
    await nextTick();
    expect(updates).toEqual([[todo1], [todo1, todo2]]);
  });

  it("an updated to replaces the old one with the same id", () => {
    const todo1 = addNewTodo();
    const todo2 = addNewTodo();
    const todo3 = addNewTodo();
    const updatedTodo: Todo = {
      ...todo2,
      name: "updated",
    };
    updateTodo(updatedTodo);
    expect(getTodos().value).toEqual([todo1, updatedTodo, todo3]);
  });

  it("updating is reactive", async () => {
    const todo1 = addNewTodo();
    const todo2 = addNewTodo();
    const todo3 = addNewTodo();
    const updates = gatherDeepUpdates(getTodos().value);
    const updatedTodo: Todo = {
      ...todo2,
      name: "updated",
    };
    updateTodo(updatedTodo);
    await nextTick();
    expect(updates).toEqual([[todo1, updatedTodo, todo3]]);
  });
});
