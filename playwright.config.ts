import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: "html",

  use: {
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "smoke",
      testMatch: [
        "**/auth/auth.spec.ts",
        "**/booking/booking.spec.ts",
      ],
    },

    {
      name: "regression",
      testMatch: [
        "**/*.spec.ts",
      ],
    },

    {
      name: "integration",
      testMatch: [
        "**/booking/bookingUpdate.spec.ts",
        "**/negative/bookingNegative.spec.ts",
      ],
    },
  ],
});