import { expect, test } from "@playwright/test";
import { BookingService } from "../../src/services/BookingService";
import { BookingFactory } from "../../src/factories/BookingFactory";
import { BookingBuilder } from "../../src/builders/BookingBuilder";

test("POST /booking should create a booking", async () => {
  const bookingService = new BookingService();

  // Crear datos dinámicos
  const bookingData = BookingFactory.create();

  // Crear booking
  const response = await bookingService.createBooking(bookingData);

  // Validar respuesta HTTP
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  // Obtener cuerpo de la respuesta
  const body = await response.json();

  // Validar bookingId
  expect(body.bookingid).toBeDefined();
  expect(typeof body.bookingid).toBe("number");

  // Validar información del booking creado
  expect(body.booking.firstname).toBe(bookingData.firstname);
  expect(body.booking.lastname).toBe(bookingData.lastname);
  expect(body.booking.totalprice).toBe(bookingData.totalprice);
  expect(body.booking.depositpaid).toBe(bookingData.depositpaid);
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

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

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

  // Crear booking
  const createResponse = await bookingService.createBooking(
    bookingData
  );

  expect(createResponse.ok()).toBeTruthy();

  const createdBooking = await createResponse.json();

  const bookingId = createdBooking.bookingid;

  // Consultar booking
  const response = await bookingService.getBooking(bookingId);

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const body = await response.json();

  // Validar datos
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