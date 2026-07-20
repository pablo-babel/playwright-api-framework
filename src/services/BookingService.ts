import { APIResponse } from "@playwright/test";
import { BaseService } from "./BaseService";

export class BookingService extends BaseService {

  public async createBooking(
    bookingData: unknown
  ): Promise<APIResponse> {

    await this.initialize();

    return await this.apiClient.post("/booking", bookingData);
  }

}