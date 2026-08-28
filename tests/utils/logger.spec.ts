import { test } from "@playwright/test";
import { Logger } from "../../src/utils/Logger";

test("Logger should write messages", async () => {
  Logger.info("This is an info message");

  Logger.warn("This is a warning message");

  Logger.error("This is an error message");

  Logger.debug("This is a debug message");
});
