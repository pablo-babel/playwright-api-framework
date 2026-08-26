import { ApiClient } from "../core/ApiClient";

export class BaseService {
  protected apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient();
  }

  protected async initialize(): Promise<void> {
    await this.apiClient.initialize();
  }

  protected async dispose(): Promise<void> {
    await this.apiClient.dispose();
  }
}
