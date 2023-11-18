import { expect, test } from "vitest";
import { setX, x } from "@/validation/let-exports.ts";

// exploratory test to verify that user.test-helper and mock-api.test-helper will work correctly
test("exported variables (let) are updated in modules", () => {
  expect(x).toEqual(1);
  setX(2);
  expect(x).toEqual(2);
  setX(3);
  expect(x).toEqual(3);
});
