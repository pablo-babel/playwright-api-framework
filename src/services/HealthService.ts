import { APIResponse } from "@playwright/test";
import { BaseService } from "./BaseService";

export class HealthService extends BaseService {

  public async ping(): Promise<APIResponse> {
    await this.initialize();

    return await this.apiClient.get("/ping");
  }

}