import { Config } from "../types/Config";

export class ConfigManager {
  public static config: Config = {
    baseUrl: process.env.BASE_URL || "",
    username: process.env.USERNAME || "",
    password: process.env.PASSWORD || "",
    timeout: Number(process.env.TIMEOUT) || 30000,
  };
}