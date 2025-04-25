import { test, expect, Page } from "@playwright/test";

test("screenshot of a video element", async ({ page }) => {
  await abortVideos(page);
  await page.goto("/#/visual/video");

  await expect(page).toHaveScreenshot();
});

const videoResourceTypes = new Set(["media", "video", "other"]);
const videoExtensions = /\.(mp4|webm|ogg|avi|mov)$/i;

async function abortVideos(page: Page) {
  await page.route("**", async (route) => {
    if (
      videoResourceTypes.has(route.request().resourceType()) &&
      videoExtensions.test(route.request().url())
    ) {
      console.debug(`Blocking video request: ${route.request().url()}`);
      await route.abort();
    } else {
      await route.continue();
    }
  });
}
