import { APIResponse } from "@playwright/test";
import { BaseService } from "./BaseService";
import { BookingRequest } from "../models/BookingRequest";
import { Endpoints } from "../config/Endpoints";
import { Headers } from "../config/Headers";

export class BookingService extends BaseService {
  public async createBooking(
    bookingData: BookingRequest
  ): Promise<APIResponse> {
    await this.initialize();

    return await this.apiClient.post(Endpoints.BOOKING, bookingData);
  }

  public async getBooking(bookingId: number): Promise<APIResponse> {
    await this.initialize();

    return await this.apiClient.get(`${Endpoints.BOOKING}/${bookingId}`);
  }

  public async getBookingIds(): Promise<APIResponse> {
    await this.initialize();

    return await this.apiClient.get(Endpoints.BOOKING);
  }

  public async updateBooking(
    bookingId: number,
    bookingData: BookingRequest,
    token: string
  ): Promise<APIResponse> {
    await this.initialize();

    return await this.apiClient.put(
      `${Endpoints.BOOKING}/${bookingId}`,
      bookingData,
      Headers.auth(token)
    );
  }

  public async partialUpdateBooking(
    bookingId: number,
    bookingData: Partial<BookingRequest>,
    token: string
  ): Promise<APIResponse> {
    await this.initialize();

    return await this.apiClient.patch(
      `${Endpoints.BOOKING}/${bookingId}`,
      bookingData,
      Headers.auth(token)
    );
  }

  public async deleteBooking(
    bookingId: number,
    token: string
  ): Promise<APIResponse> {
    await this.initialize();

    return await this.apiClient.delete(
      `${Endpoints.BOOKING}/${bookingId}`,
      Headers.auth(token)
    );
  }
}
