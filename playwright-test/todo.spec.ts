import { test, expect } from "@playwright/test";


test("edit todo", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.getByText("Get out of bed").click();
  await page.getByLabel("Name").fill("Have breakfast");
  await page.getByLabel("Description").fill("Sweet, sweet marmelade");
  await page.click("text=Save");
  await expect(page.getByText("Have breakfast")).toBeAttached()
  await expect(page.getByText("Sweet, sweet marmelade")).toBeAttached()
  await expect(page).toHaveScreenshot({
    // acceptable perceived color difference in the YIQ color space
    threshold: 0.2,

    // number of pixels that may be different
    maxDiffPixels: 0.1,
  })
});
