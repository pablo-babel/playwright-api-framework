import { expect, test } from "@playwright/test";
import { HealthService } from "../../src/services/HealthService";

test("GET /ping should respond successfully", async () => {
  const healthService = new HealthService();

  const response = await healthService.ping();

  expect(response.ok()).toBeTruthy();
});
