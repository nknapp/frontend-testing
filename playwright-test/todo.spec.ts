import { test, expect } from "@playwright/test";

test("has screenshot", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page).toHaveScreenshot();
});

test("todo has screenshot", async ({ page }) => {
  await page.goto("/");
  const el = page.getByTestId("todoItem").filter({
    has: page.getByText("Get out of bed"),
  });

  await expect(el).toHaveScreenshot();
});
