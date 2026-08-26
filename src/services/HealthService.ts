import { APIResponse } from "@playwright/test";
import { BaseService } from "./BaseService";
import { Endpoints } from "../config/Endpoints";

export class HealthService extends BaseService {
  public async ping(): Promise<APIResponse> {
    await this.initialize();

    return await this.apiClient.get(Endpoints.PING);
  }
}
