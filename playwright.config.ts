import { defineConfig, devices } from "@playwright/test";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./playwright-test",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    /* Access host from docker-container */
    baseURL: "http://host.docker.internal:5173",
    trace: "on-first-retry",
  },
  expect: {
    toHaveScreenshot: {
      pathTemplate:
        "{testDir}/{testFilePath}-snapshots/{arg}-{projectName}-linux{ext}",
    },
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        /* Connect to Playwright server in container */
        connectOptions: {
          wsEndpoint: "ws://localhost:3000/",
        },
      },
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        connectOptions: {
          wsEndpoint: "ws://localhost:3000/",
        },
      },
    },

    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        connectOptions: {
          wsEndpoint: "ws://localhost:3000/",
        },
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "npm run dev:server -- --port 5173",
    url: "http://127.0.0.1:5173",
    stdout: "pipe",
    timeout: 10000,
    reuseExistingServer: !process.env.CI,
  },
});
