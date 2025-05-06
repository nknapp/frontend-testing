// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { test, expect } from "@playwright/test";

test("edit todo", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
});
