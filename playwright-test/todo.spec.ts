import { test, expect } from "@playwright/test";

test("has screenshot", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveScreenshot();
});
