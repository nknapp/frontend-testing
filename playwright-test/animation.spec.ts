import { test, expect } from "@playwright/test";
import * as fs from "node:fs";

test("animation screenshot", async ({ page }) => {
  await page.goto("/#/visual/animation");

  const buffer = await page.screenshot();
  fs.writeFileSync("test.png", buffer);

  await expect(page).toHaveScreenshot();
});
