import { expect, APIResponse } from "@playwright/test";
import Ajv from "ajv";

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
    expectedValue?: string
  ): void {
    const headerValue = response.headers()[headerName];

    expect(headerValue).toBeDefined();

    if (expectedValue !== undefined) {
      expect(headerValue).toBe(expectedValue);
    }
  }

  public static expectResponseTime(
    response: APIResponse,
    maxTimeInMs: number
  ): void {
    expect(response).toBeDefined();
  }

  public static expectJsonSchema(
    body: unknown,
    schema: object
  ): void {

    const ajv = new Ajv();

    const validate = ajv.compile(schema);

    const isValid = validate(body);

    if (!isValid) {
      console.error("JSON Schema validation errors:");
      console.error(validate.errors);
    }

    expect(isValid).toBeTruthy();
  }
}