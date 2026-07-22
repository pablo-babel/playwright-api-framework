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

test("GET /booking should return booking ids", async () => {
  const bookingService = new BookingService();
  const response = await bookingService.getBookingIds();
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(Array.isArray(body)).toBeTruthy();
  expect(body.length).toBeGreaterThan(0);
});

test("GET /booking/{id} should return a booking", async () => {
  const bookingService = new BookingService();
  const bookingData  = {
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

  const createResponse = await bookingService.createBooking(bookingData);
  expect(createResponse.ok()).toBeTruthy();
  const createdBooking = await createResponse.json();
  const bookingId = createdBooking.bookingid;
  const response = await bookingService.getBooking(bookingId);
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body.firstname).toBe("Jim");
  expect(body.lastname).toBe("Brown");
  expect(body.totalprice).toBe(111);
  expect(body.depositpaid).toBe(true);
});