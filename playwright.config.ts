import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  webServer: {
    command: "npx vite --port 5184 --strictPort",
    url: "http://localhost:5184",
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: "http://localhost:5184",
  },
});
