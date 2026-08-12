import { expect, test } from "@playwright/test";
import { BookingService } from "../../src/services/BookingService";
import { BookingFactory } from "../../src/factories/BookingFactory";
import { BookingBuilder } from "../../src/builders/BookingBuilder";
import { ResponseValidator } from "../../src/validators/ResponseValidator";
import { BookingSchema } from "../../src/schemas/BookingSchema";

test("POST /booking should create a booking", async () => {

  const bookingService = new BookingService();

  // Crear datos dinámicos
  const bookingData = BookingFactory.create();

  // Crear booking
  const response = await bookingService.createBooking(
    bookingData
  );

  // Validar status code
  ResponseValidator.expectStatus(
    response,
    200
  );

  // Obtener cuerpo
  const body = await response.json();

  // Validar bookingId
  expect(body.bookingid).toBeDefined();
  expect(typeof body.bookingid).toBe("number");

  // Validar información del booking
  expect(body.booking.firstname).toBe(
    bookingData.firstname
  );

  expect(body.booking.lastname).toBe(
    bookingData.lastname
  );

  expect(body.booking.totalprice).toBe(
    bookingData.totalprice
  );

  expect(body.booking.depositpaid).toBe(
    bookingData.depositpaid
  );

  expect(body.booking.additionalneeds).toBe(
    bookingData.additionalneeds
  );

  // Validar fechas
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

  // Validar status code
  ResponseValidator.expectStatus(
    response,
    200
  );

  const body = await response.json();

  // Validar que sea un arreglo
  expect(Array.isArray(body)).toBeTruthy();

  expect(body.length).toBeGreaterThan(0);

  // Validar estructura del primer elemento
  expect(body[0]).toHaveProperty(
    "bookingid"
  );

  expect(typeof body[0].bookingid).toBe(
    "number"
  );
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

  // Crear booking
  const createResponse =
    await bookingService.createBooking(
      bookingData
    );

  expect(createResponse.ok()).toBeTruthy();

  const createdBooking =
    await createResponse.json();

  const bookingId =
    createdBooking.bookingid;

  // Obtener booking
  const response =
    await bookingService.getBooking(
      bookingId
    );

  // Validar status
  ResponseValidator.expectStatus(
    response,
    200
  );

  // Obtener body
  const body =
    await response.json();

  // Validar JSON Schema
  ResponseValidator.expectJsonSchema(
    body,
    BookingSchema
  );

  // Validar contenido
  expect(body.firstname).toBe(
    bookingData.firstname
  );

  expect(body.lastname).toBe(
    bookingData.lastname
  );

  expect(body.totalprice).toBe(
    bookingData.totalprice
  );

  expect(body.depositpaid).toBe(
    bookingData.depositpaid
  );

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