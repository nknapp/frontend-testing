import { describe, it, expect } from "vitest";
import { renderComponent } from "@/test-utils/renderComponent.test-helper.ts";
import NumberStatistics from "@/statistics/NumberStatistics.vue";
import { dom } from "@/test-utils/dom.test-helper.ts";

describe("NumberStatistics", () => {
  it("shows the correct sum", () => {
    renderComponent(NumberStatistics, {
      numbers: [1, 2, 3, 4],
    });
    expect(dom.getByText("Sum: 10"));
  });
});
