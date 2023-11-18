import { describe, it, expect } from "vitest";
import { getTodo } from "@/backend/getTodo.ts";
import { useRequestHandlers } from "@/test-utils/mock-api.test-helper.ts";
import { mockGetTodoEndpoint } from "@/test-utils/mock-requestHandlers/todos.get.test-helper.ts";

describe("getTodo", () => {
  it("calls the backend with PUT /todos/:todoID", async () => {
    useRequestHandlers(
      mockGetTodoEndpoint({
        id: "123",
        name: "my name",
        description: "my description",
      }),
    );
    const todo = await getTodo("123");
    expect(todo).toEqual({
      id: "123",
      name: "my name",
      description: "my description",
    });
  });
});
