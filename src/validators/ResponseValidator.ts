import { APIResponse, expect } from "@playwright/test";

export class ResponseValidator {

  public static expectStatus(
    response: APIResponse,
    expectedStatus: number
  ): void {

    expect(response.status()).toBe(expectedStatus);
  }


  public static expectHeader(
    response: APIResponse,
    headerName: string,
    expectedValue: string
  ): void {

    const actualValue = response.headers()[headerName.toLowerCase()];

    expect(actualValue).toBe(expectedValue);
  }


  public static expectResponseTime(
    responseTime: number,
    maxResponseTime: number
  ): void {

    expect(responseTime).toBeLessThanOrEqual(maxResponseTime);
  }

}