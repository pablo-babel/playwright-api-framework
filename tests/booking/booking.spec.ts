import { expect, test } from "@playwright/test";
import { BookingService } from "../../src/services/BookingService";
import { BookingFactory } from "../../src/factories/BookingFactory";
import { BookingBuilder } from "../../src/builders/BookingBuilder";
import { ResponseValidator } from "../../src/validators/ResponseValidator";

test("POST /booking should create a booking", async () => {
  const bookingService = new BookingService();

  // Crear datos dinámicos
  const bookingData = BookingFactory.create();

  // Crear booking
  const response = await bookingService.createBooking(bookingData);

  // Validar status code
  ResponseValidator.expectStatus(response, 200);

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

  expect(body.booking.additionalneeds).toBe(bookingData.additionalneeds);

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
  ResponseValidator.expectStatus(response, 200);

  const body = await response.json();

  // Validar que la respuesta sea un arreglo
  expect(Array.isArray(body)).toBeTruthy();

  expect(body.length).toBeGreaterThan(0);

  // Validar estructura del primer elemento
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

  // Crear booking
  const createResponse = await bookingService.createBooking(bookingData);

  ResponseValidator.expectStatus(createResponse, 200);

  const createdBooking = await createResponse.json();

  const bookingId = createdBooking.bookingid;

  // Consultar booking
  const response = await bookingService.getBooking(bookingId);

  // Validar status code
  ResponseValidator.expectStatus(response, 200);

  const body = await response.json();

  // Validar estructura
  expect(body).toHaveProperty("firstname");
  expect(body).toHaveProperty("lastname");
  expect(body).toHaveProperty("totalprice");
  expect(body).toHaveProperty("depositpaid");
  expect(body).toHaveProperty("bookingdates");
  expect(body).toHaveProperty("additionalneeds");

  expect(body.bookingdates).toHaveProperty("checkin");
  expect(body.bookingdates).toHaveProperty("checkout");

  // Validar tipos de datos
  expect(typeof body.firstname).toBe("string");
  expect(typeof body.lastname).toBe("string");
  expect(typeof body.totalprice).toBe("number");
  expect(typeof body.depositpaid).toBe("boolean");
  expect(typeof body.additionalneeds).toBe("string");

  // Validar contenido
  expect(body.firstname).toBe(bookingData.firstname);

  expect(body.lastname).toBe(bookingData.lastname);

  expect(body.totalprice).toBe(bookingData.totalprice);

  expect(body.depositpaid).toBe(bookingData.depositpaid);

  expect(body.additionalneeds).toBe(bookingData.additionalneeds);

  expect(body.bookingdates.checkin).toBe(bookingData.bookingdates.checkin);

  expect(body.bookingdates.checkout).toBe(bookingData.bookingdates.checkout);
});
