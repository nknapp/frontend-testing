import { describe, expect, it } from "vitest";
import {
  renderComponent,
  RenderComponentReturn,
} from "@/test-utils/renderComponent.test-helper.ts";
import TodoList from "@/components/TodoList.vue";
import { dom } from "@/test-utils/dom.test-helper.ts";
import { createTodo } from "@/model/todo.test-helper.ts";
import { DeepReadonly, Ref } from "vue";
import { Todo } from "@/model/todo.ts";
import { getTodos, initTodosForTest } from "@/store/todoStore.ts";
import {
  editTodo,
  getTodoItemByName,
  queryAllTodoItems,
} from "@/components/TodoItem.test-helper.ts";
import { user } from "@/test-utils/user.test-helper.ts";

// Another example of a render helper that also returns the model-value
// Render a test component, return the v-model bound ref in order to
// be able to test that it properly updates
function renderTodoList(
  initialTodoList: Todo[],
): RenderComponentReturn & { todoList: DeepReadonly<Ref<Todo[]>> } {
  initTodosForTest(initialTodoList);
  return {
    todoList: getTodos(),
    ...renderComponent(TodoList),
  };
}

describe("TodoList", () => {
  it("renders", () => {
    renderTodoList([
      createTodo({
        name: "Todo1",
        description: "description1",
      }),
      createTodo({
        name: "Todo2",
        description: "description2",
      }),
    ]);
    expect(dom.getByText("Todo1")).not.toBeNull();
    expect(dom.getByText("description1")).not.toBeNull();
    expect(dom.getByText("Todo2")).not.toBeNull();
    expect(dom.getByText("description2")).not.toBeNull();
  });

  it("edits todo name", async () => {
    const { todoList } = renderTodoList([
      createTodo({
        id: "1",
        name: "Todo1",
      }),
      createTodo({
        id: "2",
        name: "Todo2",
      }),
    ]);

    await user.click(dom.getByText("Todo1"));
    // This was my first attempt:
    //   await user.clear(inputField)
    //   await user.type(inputField, "something else{enter}")
    // before I noticed that the input element is not automatically focused.
    // I am doing this now to make sure the test fails when I cannot immediately start to type
    await user.keyboard("something else{enter}");
    await user.click(dom.getByRole("button", { name: "Save" }));
    expect(todoList.value).toEqual([
      createTodo({
        id: "1",
        name: "something else",
      }),
      createTodo({
        id: "2",
        name: "Todo2",
      }),
    ]);
    expect(dom.getByText("something else")).not.toBeNull();
  });

  it("edits todo name (using helper)", async () => {
    const { todoList } = renderTodoList([
      createTodo({
        id: "1",
        name: "Todo1",
      }),
      createTodo({
        id: "2",
        name: "Todo2",
      }),
    ]);

    await editTodo(getTodoItemByName("Todo1"), {
      name: "new name 1",
      description: "new description 1",
    });

    expect(todoList.value).toEqual([
      createTodo({
        id: "1",
        name: "new name 1",
        description: "new description 1",
      }),
      createTodo({
        id: "2",
        name: "Todo2",
      }),
    ]);
    expect(dom.getByText("new name 1")).not.toBeNull();
    expect(dom.getByText("new description 1")).not.toBeNull();
  });

  it("adds new todo", async () => {
    renderTodoList([]);
    await user.click(dom.getByRole("button", { name: "Add new todo" }));
    expect(queryAllTodoItems()).toHaveLength(1);
    expect(getTodos().value).toHaveLength(1);
  });
});
