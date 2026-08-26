import { expect, test } from "@playwright/test";
import { AuthService } from "../../src/services/AuthService";
import { AuthData } from "../../src/data/AuthData";

test("POST /auth should return a token", async () => {
  const authService = new AuthService();

  const response = await authService.login(AuthData.validCredentials);

  expect(response.ok()).toBeTruthy();

  const body = await response.json();

  expect(body.token).toBeDefined();
});
