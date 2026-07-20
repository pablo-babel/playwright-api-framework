import { APIResponse } from "@playwright/test";
import { BaseService } from "./BaseService";

export class AuthService extends BaseService {

  public async login(
    username: string,
    password: string
  ): Promise<APIResponse> {

    await this.initialize();

    return await this.apiClient.post("/auth", {
      username,
      password,
    });
  }

}