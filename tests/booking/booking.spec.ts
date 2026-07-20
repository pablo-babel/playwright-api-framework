import { expect, test } from "@playwright/test";
import { BookingService } from "../../src/services/BookingService";


test("POST /booking should create a booking", async () => {

  const bookingService = new BookingService();

  const booking = {
    firstname: "Jim",
    lastname: "Brown",
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: "2026-01-01",
      checkout: "2026-01-05"
    },
    additionalneeds: "Breakfast"
  };


  const response = await bookingService.createBooking(
    booking
  );


  expect(response.ok()).toBeTruthy();


  const body = await response.json();


  expect(body.bookingid).toBeDefined();

});