import { describe, it, expect } from "vitest";
import { renderComponent } from "@/test-utils/renderComponent.test-helper.ts";
import { dom } from "@/test-utils/dom.test-helper.ts";
import { defineComponent, nextTick, ref } from "vue";
import { Todo } from "@/model/todo.ts";
import TodoItem from "@/components/TodoItem.vue";
import { createTodo } from "@/model/todo.test-helper.ts";
import { mount } from "@vue/test-utils";
import { screen } from "@testing-library/dom";
import { copyToClipboard } from "@/utils/copyToClipboard.ts";
import { user } from "@/test-utils/user.test-helper.ts";
import { notifyUser } from "@/utils/notifyUser.ts";
import { waitMillis } from "@/test-utils/waitMillis.test-helper.ts";

function renderTodo(todo: Todo) {
  const vModel = ref<Todo>(todo);
  const TestComponent = defineComponent({
    template: `
        <TodoItem v-model="vModel"/>`,
    components: { TodoItem },
    setup() {
      return { vModel };
    },
  });
  return {
    vModel,
    ...renderComponent(TestComponent),
  };
}

describe("TodoItem", () => {
  it("renders name and description", () => {
    renderTodo(
      createTodo({
        name: "name",
        description: "description",
      }),
    );
    expect(dom.getByText("name")).not.toBeNull();
    expect(dom.getByText("description")).not.toBeNull();
  });

  it("click switches to edit mode and focuses and selects name", async () => {
    const { vModel } = renderTodo(
      createTodo({
        id: "1",
        name: "name",
        description: "description",
      }),
    );

    await user.click(dom.getByText("name"));

    const nameInput = dom.getByDisplayValue("name");
    expect(nameInput).not.toBeNull();
    // This was my first attempt:
    //   await user.clear(inputField)
    //   await user.type(inputField, "something else{enter}")
    // before I noticed that the input element is not automatically focused.
    // I am doing this now to make sure the test fails when I cannot immediately start to type
    await user.keyboard("something else{enter}");
    await user.click(dom.getByRole("button", { name: "Save" }));
    expect(dom.getByText("something else")).not.toBeNull();
    await nextTick();

    expect(vModel.value).toEqual({
      id: "1",
      name: "something else",
      description: "description",
    });
  });

  it("click to edit (renderTodo)", async () => {
    const { vModel } = renderTodo(
      createTodo({
        id: "1",
        name: "name",
      }),
    );

    await user.click(dom.getByText("name"));
    await user.keyboard("something else{enter}");
    await user.click(dom.getByRole("button", { name: "Save" }));

    expect(vModel.value).toEqual(
      createTodo({
        id: "1",
        name: "something else",
      }),
    );

    expect(dom.getByText("something else")).not.toBeNull();
  });

  it("click to edit (using testing library queries and test-utils to verify emitted signal)", async () => {
    const { wrapper } = renderComponent(TodoItem, {
      modelValue: createTodo({
        id: "1",
        name: "name",
      }),
    });

    await user.click(screen.getByText("name"));
    await user.keyboard("something else{enter}");
    await user.click(dom.getByRole("button", { name: "Save" }));
    expect(wrapper.emitted("update:model-value")).toEqual([
      [createTodo({ id: "1", name: "something else" })],
    ]);
    // It is not possible to test the screen update, because data is not
    // fed back into the component in the test.
    // expect(screen.getByText("something else")).not.toBeNull();
  });

  it("Copy to clipboard, using mocked clipboard and notification modules", async () => {
    renderTodo(createTodo({ name: "my name", description: "my description" }));
    await user.click(dom.getByRole("button", { name: "Copy to clipboard" }));
    expect(copyToClipboard).toHaveBeenCalledWith("my name\nmy description");
    expect(notifyUser).toHaveBeenCalledWith("Copied to clipboard");
  });

  it("does not switch to edit mode when copying to clipboard", async () => {
    renderTodo(createTodo({ name: "my name", description: "my description" }));
    await user.click(dom.getByRole("button", { name: "Copy to clipboard" }));
    // Difficult to test that nothing happens, we have to wait shortly here.
    await waitMillis(100);
    expect(dom.queryByLabelText("Name")).not.toBeInTheDocument();
  });
});

describe("no recommended", () => {
  it("click to edit (vue-testutils only)", async () => {
    const wrapper = mount(TodoItem, {
      propsData: {
        modelValue: createTodo({
          id: "1",
          name: "name",
        }),
      },
    });
    await wrapper.find("h3").trigger("click");
    await wrapper.find("input").setValue("something else");
    await wrapper.find("input").trigger("keyup", { key: "enter" });
    await wrapper.find("button").trigger("click");
    await nextTick();

    expect(wrapper.emitted("update:model-value")).toEqual([
      [createTodo({ id: "1", name: "something else" })],
    ]);
    // It is not possible to test the screen update, because data is not
    // fed back into the component in the test.
    //
    // expect(wrapper.find("h3").text()).toEqual("something else")
  });
});
