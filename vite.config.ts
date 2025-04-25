/// <reference types="vitest" />

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@/": "/src/",
    },
  },
  server: {
    host: "0.0.0.0",
  },
  test: {
    include: ["src/**/*.test.ts"],
    environment: "jsdom",
    css: true,
    setupFiles: ["./src/test-setup/setup.ts"],
    globalSetup: ["./src/test-setup/globalSetup.ts"],
  },
});
