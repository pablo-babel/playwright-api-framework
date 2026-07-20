import { expect, test } from "@playwright/test";
import { AuthService } from "../../src/services/AuthService";

test("POST /auth should return a token", async () => {
  const authService = new AuthService();

  const response = await authService.login(
    "admin",
    "password123"
  );

  expect(response.ok()).toBeTruthy();

  const body = await response.json();

  expect(body.token).toBeDefined();
});