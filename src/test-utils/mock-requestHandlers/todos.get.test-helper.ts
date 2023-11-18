import { http, HttpResponse, RequestHandler } from "msw";
import { baseApiUrl } from "@/backend/config.ts";
import { TodoResponse } from "@/backend/getTodo.ts";

export function mockGetTodoEndpoint(
  mockedValues: Partial<TodoResponse> = {},
): RequestHandler {
  return http.get(`${baseApiUrl}/todos/:id`, ({ params }) => {
    return HttpResponse.json({
      id: params.id as string,
      name: "name-" + params.id,
      description: "description-" + params.id,
      ...mockedValues,
    } satisfies TodoResponse);
  });
}
