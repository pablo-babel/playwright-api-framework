import { expect, test } from "@playwright/test";
import { BookingService } from "../../src/services/BookingService";
import { BookingFactory } from "../../src/factories/BookingFactory";
import { BookingBuilder } from "../../src/builders/BookingBuilder";

test("POST /booking should create a booking", async () => {
  const bookingService = new BookingService();

  const bookingData = BookingFactory.create();

  const response = await bookingService.createBooking(bookingData);

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body).toHaveProperty("bookingid");
  expect(typeof body.bookingid).toBe("number");

  expect(body).toHaveProperty("booking");

  expect(body.booking).toHaveProperty("firstname");
  expect(body.booking).toHaveProperty("lastname");
  expect(body.booking).toHaveProperty("totalprice");
  expect(body.booking).toHaveProperty("depositpaid");
  expect(body.booking).toHaveProperty("bookingdates");
  expect(body.booking).toHaveProperty("additionalneeds");

  expect(body.booking.firstname).toBe(bookingData.firstname);
  expect(body.booking.lastname).toBe(bookingData.lastname);
  expect(body.booking.totalprice).toBe(bookingData.totalprice);
  expect(body.booking.depositpaid).toBe(bookingData.depositpaid);
  expect(body.booking.additionalneeds).toBe(
    bookingData.additionalneeds
  );

  expect(body.booking.bookingdates.checkin).toBe(
    bookingData.bookingdates.checkin
  );

  expect(body.booking.bookingdates.checkout).toBe(
    bookingData.bookingdates.checkout
  );
});

test("GET /booking should return booking ids", async () => {
  const bookingService = new BookingService();

  const response = await bookingService.getBookingIds();

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(Array.isArray(body)).toBeTruthy();
  expect(body.length).toBeGreaterThan(0);

  expect(body[0]).toHaveProperty("bookingid");
  expect(typeof body[0].bookingid).toBe("number");
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

  const createResponse = await bookingService.createBooking(
    bookingData
  );

  expect(createResponse.ok()).toBeTruthy();
  expect(createResponse.status()).toBe(200);

  const createdBooking = await createResponse.json();

  expect(createdBooking).toHaveProperty("bookingid");
  expect(typeof createdBooking.bookingid).toBe("number");

  const bookingId = createdBooking.bookingid;

  const response = await bookingService.getBooking(bookingId);

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body).toHaveProperty("firstname");
  expect(body).toHaveProperty("lastname");
  expect(body).toHaveProperty("totalprice");
  expect(body).toHaveProperty("depositpaid");
  expect(body).toHaveProperty("bookingdates");
  expect(body).toHaveProperty("additionalneeds");

  expect(body.bookingdates).toHaveProperty("checkin");
  expect(body.bookingdates).toHaveProperty("checkout");

  expect(typeof body.firstname).toBe("string");
  expect(typeof body.lastname).toBe("string");
  expect(typeof body.totalprice).toBe("number");
  expect(typeof body.depositpaid).toBe("boolean");
  expect(typeof body.additionalneeds).toBe("string");

  expect(body.firstname).toBe(bookingData.firstname);
  expect(body.lastname).toBe(bookingData.lastname);
  expect(body.totalprice).toBe(bookingData.totalprice);
  expect(body.depositpaid).toBe(bookingData.depositpaid);
  expect(body.additionalneeds).toBe(
    bookingData.additionalneeds
  );

  expect(body.bookingdates.checkin).toBe(
    bookingData.bookingdates.checkin
  );

  expect(body.bookingdates.checkout).toBe(
    bookingData.bookingdates.checkout
  );
});