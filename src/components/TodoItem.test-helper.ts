import { Todo } from "@/model/todo.ts";
import { dom } from "@/test-utils/dom.test-helper.ts";
import { userEvent } from "@testing-library/user-event";

export function getTodoItemByName(name: string): HTMLElement {
  const items = dom
    .queryAllByRole("heading", { name: name })
    .filter((el) => el.textContent?.startsWith(name))
    .map((el) => el.closest("[data-testid='todoItem']"))
    .filter((el): el is HTMLElement => el instanceof HTMLElement);
  if (items.length === 0) {
    throw new Error(`Unable to find TodoItem by name: ${name}`);
  }
  if (items.length > 1) {
    dom.debug(items);
    throw new Error(`Found multiple TodoItems by name: ${name}`);
  }
  return items[0];
}

export function queryAllTodoItems(): HTMLElement[] {
  return dom.queryAllByTestId("todoItem");
}

export async function editTodo(
  todoItem: HTMLElement,
  todo: Partial<Todo>,
): Promise<void> {
  const user = userEvent.setup();
  await user.click(todoItem);
  if (todo.name) {
    await user.keyboard(todo.name + "{enter}");
  }
  await user.tab();
  if (todo.description) {
    await user.keyboard(todo.description + "{enter}");
  }
  await user.tab();
  await user.keyboard("{enter}");
}
