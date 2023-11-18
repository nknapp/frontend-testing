import { setupServer } from "msw/node";
import { beforeEach } from "vitest";
import { RequestHandler } from "msw";
import { mockGetTodoEndpoint } from "@/test-utils/mock-requestHandlers/todos.get.test-helper.ts";

// This is a short example of how the mock-service-worker can be used.

// Here, you can add default request handlers for all endpoints that are called
// from anywhere in tne API
const server = setupServer(mockGetTodoEndpoint());

// Sadly, it does not support testing which requests have been captured,
// We do this by storing the required data in an array that can be verified.
// In order to check wether the correct requests are sent to the backend.
// Usually, you should not do this:
// Have a look at https://mswjs.io/docs/best-practices/avoid-request-assertions
// for reasoning and exceptions.
export let sentRequests: Request[] = [];
server.events.on("request:start", async ({ request }) => {
  sentRequests.push(request.clone());
});

server.listen();

beforeEach(() => {
  server.resetHandlers();
  sentRequests = [];
});

// If you need a specific response for an endpoint, you can override the default ones here
export function useRequestHandlers(...handlers: RequestHandler[]) {
  server.use(...handlers);
}
