import { describe, expect, it } from "vitest";
import {
  sentRequests,
  useRequestHandlers,
} from "@/test-utils/mock-api.test-helper.ts";
import { http, HttpResponse } from "msw";
import { baseApiUrl } from "@/backend/config.ts";
import { Todo } from "@/model/todo.ts";
import { mockGetTodoEndpoint } from "@/test-utils/mock-requestHandlers/todos.get.test-helper.ts";

describe("mock-api", () => {
  it("mocks response correctly", async () => {
    useRequestHandlers(
      http.get("http://localhost:3000/some/request", () =>
        HttpResponse.json({ success: true }),
      ),
    );
    const response = await window.fetch("http://localhost:3000/some/request");
    expect(await response.json()).toEqual({
      success: true,
    });
  });

  it("collects sent requests", async () => {
    useRequestHandlers(
      http.post("http://localhost:3000/echo", async () =>
        HttpResponse.json({ success: true }),
      ),
    );
    await window.fetch("http://localhost:3000/echo", {
      method: "POST",
      body: JSON.stringify({ key: "value" }),
    });
    expect(sentRequests).toHaveLength(1);
    expect(await sentRequests[0].json()).toEqual({ key: "value" });
  });

  it("uses default mocks if non are present", async () => {
    const todo = await window.fetch(`${baseApiUrl}/todos/abc`);
    expect(await todo.json()).toEqual({
      id: "abc",
      name: "name-abc",
      description: "description-abc",
    } satisfies Todo);
  });

  it("overrides default mocks", async () => {
    useRequestHandlers(mockGetTodoEndpoint({ name: "different name" }));
    const todo = await window.fetch(`${baseApiUrl}/todos/abc`);
    expect(await todo.json()).toEqual({
      id: "abc",
      name: "different name",
      description: "description-abc",
    } satisfies Todo);
  });
});
