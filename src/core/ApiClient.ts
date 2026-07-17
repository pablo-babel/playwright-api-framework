import { APIRequestContext, APIResponse, request } from "@playwright/test";
import { ConfigManager } from "../config/ConfigManager";

export class ApiClient {
  private apiContext!: APIRequestContext;

  public async initialize(): Promise<void> {
    this.apiContext = await request.newContext({
      baseURL: ConfigManager.config.baseUrl,
      timeout: ConfigManager.config.timeout,
    });
  }

  public async dispose(): Promise<void> {
    await this.apiContext.dispose();
  }

  public async get(url: string): Promise<APIResponse> {
    return await this.apiContext.get(url);
  }

  public async post(url: string, data?: unknown): Promise<APIResponse> {
    return await this.apiContext.post(url, { data });
  }

  public async put(url: string, data?: unknown): Promise<APIResponse> {
    return await this.apiContext.put(url, { data });
  }

  public async patch(url: string, data?: unknown): Promise<APIResponse> {
    return await this.apiContext.patch(url, { data });
  }

  public async delete(url: string): Promise<APIResponse> {
    return await this.apiContext.delete(url);
  }
}