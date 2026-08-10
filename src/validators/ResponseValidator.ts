import { APIResponse, expect } from "@playwright/test";

export class ResponseValidator {

  public static expectStatus(
    response: APIResponse,
    expectedStatus: number
  ): void {

    expect(response.status()).toBe(expectedStatus);
  }

}