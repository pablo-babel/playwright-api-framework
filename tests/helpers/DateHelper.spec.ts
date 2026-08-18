import { expect, test } from "@playwright/test";
import { DateHelper } from "../../src/helpers/DateHelper";

test.describe("DateHelper", () => {

  test("should return the current date", () => {
    const currentDate = DateHelper.getCurrentDate();

    expect(currentDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  test("should return a future date", () => {
    const currentDate = new Date(
      DateHelper.getCurrentDate()
    );

    const futureDate = new Date(
      DateHelper.getFutureDate(5)
    );

    expect(futureDate.getTime()).toBeGreaterThan(
      currentDate.getTime()
    );
  });

  test("should return a past date", () => {
    const currentDate = new Date(
      DateHelper.getCurrentDate()
    );

    const pastDate = new Date(
      DateHelper.getPastDate(5)
    );

    expect(pastDate.getTime()).toBeLessThan(
      currentDate.getTime()
    );
  });

});