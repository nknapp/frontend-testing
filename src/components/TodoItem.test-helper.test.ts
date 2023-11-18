import { describe, it, expect } from "vitest";
import { renderComponent } from "@/test-utils/renderComponent.test-helper.ts";
import { defineComponent, ref } from "vue";
import { createTodo } from "@/model/todo.test-helper.ts";
import TodoItem from "@/components/TodoItem.vue";
import {
  getTodoItemByName,
  editTodo,
} from "@/components/TodoItem.test-helper.ts";
import { dom } from "@/test-utils/dom.test-helper.ts";
import { Todo } from "@/model/todo.ts";

function renderTodos(todo1: Todo, todo2: Todo) {
  return renderComponent(
    defineComponent({
      name: "TestComponent",
      components: { TodoItem },
      setup() {
        return {
          todo1: ref(todo1),
          todo2: ref(todo2),
        };
      },
      template: `
          <div>
            <TodoItem v-model="todo1"/>
            <TodoItem v-model="todo2"/>
          </div>
        `,
    }),
  );
}

// OK, maybe testing the test-helper is a bit too much, but on the other hand...
describe("TodoItem.test-helper", () => {
  describe("getTodoItem", () => {
    it("updates a todo", async () => {
      renderTodos(
        createTodo({ name: "todo1" }),
        createTodo({ name: "todo2", description: "description2" }),
      );
      const todo = getTodoItemByName("todo1");
      await editTodo(
        todo,
        createTodo({ name: "new name", description: "new description" }),
      );

      expect(dom.getByText("new name")).not.toBeNull();
      expect(dom.getByText("new description")).not.toBeNull();
      expect(dom.getByText("todo2")).not.toBeNull();
      expect(dom.getByText("description2")).not.toBeNull();
      expect(dom.queryByText("todo1")).toBeNull();
    });
  });
});
