import { describe, it, expect } from "vitest";
import { apiGet } from "./fetchFromApi.ts";
import { useRequestHandlers } from "@/test-utils/mock-api.test-helper.ts";
import { http, HttpResponse } from "msw";
import { baseApiUrl } from "@/backend/config.ts";

describe("apiGet", () => {
  it("fetches with base url", async () => {
    useRequestHandlers(
      http.get(`${baseApiUrl}/echo/:string`, ({ params }) => {
        return HttpResponse.json({
          echo: params.string,
        });
      }),
    );
    const response = await apiGet("/echo/abc");

    expect(await response.json()).toEqual({ echo: "abc" });
  });
});
