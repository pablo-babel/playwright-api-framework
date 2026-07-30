import { expect, test } from "@playwright/test";
import { BookingService } from "../../src/services/BookingService";
import { BookingFactory } from "../../src/factories/BookingFactory";
import { BookingBuilder } from "../../src/builders/BookingBuilder";

test("POST /booking should create a booking", async () => {
  const bookingService = new BookingService();

  const bookingData = BookingFactory.create();

  const response = await bookingService.createBooking(bookingData);

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

  const bookingData = new BookingBuilder()
    .withFirstname("Juan")
    .withLastname("Pérez")
    .withTotalPrice(500)
    .withDepositPaid(false)
    .withAdditionalNeeds("Dinner")
    .build();

  const createResponse = await bookingService.createBooking(bookingData);

  expect(createResponse.ok()).toBeTruthy();

  const createdBooking = await createResponse.json();

  const bookingId = createdBooking.bookingid;

  const response = await bookingService.getBooking(bookingId);

  expect(response.ok()).toBeTruthy();

  const body = await response.json();

  expect(body.firstname).toBe(bookingData.firstname);
  expect(body.lastname).toBe(bookingData.lastname);
  expect(body.totalprice).toBe(bookingData.totalprice);
  expect(body.depositpaid).toBe(bookingData.depositpaid);
  expect(body.additionalneeds).toBe(bookingData.additionalneeds);
});