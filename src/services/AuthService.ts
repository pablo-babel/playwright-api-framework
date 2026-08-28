import { APIResponse } from "@playwright/test";
import { BaseService } from "./BaseService";
import { AuthRequest } from "../models/AuthRequest";
import { Endpoints } from "../config/Endpoints";

export class AuthService extends BaseService {
  public async login(credentials: AuthRequest): Promise<APIResponse> {
    await this.initialize();

    return await this.apiClient.post(Endpoints.AUTH, credentials);
  }
}
