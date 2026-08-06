import { expect, test } from "@playwright/test";
import { AuthService } from "../../src/services/AuthService";
import { BookingService } from "../../src/services/BookingService";
import { AuthData } from "../../src/data/AuthData";
import { BookingData } from "../../src/data/BookingData";

test("PUT /booking/{id} should update a booking", async () => {
  const authService = new AuthService();
  const bookingService = new BookingService();

  // Obtener token
  const authResponse = await authService.login(
    AuthData.validCredentials
  );

  expect(authResponse.ok()).toBeTruthy();
  expect(authResponse.status()).toBe(200);

  const authBody = await authResponse.json();
  const token = authBody.token;

  expect(token).toBeDefined();
  expect(typeof token).toBe("string");

  // Crear booking
  const createResponse = await bookingService.createBooking(
    BookingData.defaultBooking
  );

  expect(createResponse.ok()).toBeTruthy();
  expect(createResponse.status()).toBe(200);

  const createdBooking = await createResponse.json();
  const bookingId = createdBooking.bookingid;

  expect(bookingId).toBeDefined();
  expect(typeof bookingId).toBe("number");

  // ==========================
  // Prueba 1 - PUT
  // ==========================

  const updateResponse = await bookingService.updateBooking(
    bookingId,
    BookingData.updatedBooking,
    token
  );

  expect(updateResponse.ok()).toBeTruthy();
  expect(updateResponse.status()).toBe(200);

  const body = await updateResponse.json();

  // Validar estructura
  expect(body).toHaveProperty("firstname");
  expect(body).toHaveProperty("lastname");
  expect(body).toHaveProperty("totalprice");
  expect(body).toHaveProperty("depositpaid");
  expect(body).toHaveProperty("bookingdates");
  expect(body).toHaveProperty("additionalneeds");

  expect(body.bookingdates).toHaveProperty("checkin");
  expect(body.bookingdates).toHaveProperty("checkout");

  // Validar tipos
  expect(typeof body.firstname).toBe("string");
  expect(typeof body.lastname).toBe("string");
  expect(typeof body.totalprice).toBe("number");
  expect(typeof body.depositpaid).toBe("boolean");
  expect(typeof body.additionalneeds).toBe("string");

  // Validar contenido
  expect(body.firstname).toBe(
    BookingData.updatedBooking.firstname
  );

  expect(body.lastname).toBe(
    BookingData.updatedBooking.lastname
  );

  expect(body.totalprice).toBe(
    BookingData.updatedBooking.totalprice
  );

  expect(body.depositpaid).toBe(
    BookingData.updatedBooking.depositpaid
  );

  expect(body.additionalneeds).toBe(
    BookingData.updatedBooking.additionalneeds
  );

  expect(body.bookingdates.checkin).toBe(
    BookingData.updatedBooking.bookingdates.checkin
  );

  expect(body.bookingdates.checkout).toBe(
    BookingData.updatedBooking.bookingdates.checkout
  );

  /*
  ===========================
  Prueba 2 - PATCH
  ===========================

  const patchResponse = await bookingService.partialUpdateBooking(
    bookingId,
    BookingData.partialBooking,
    token
  );

  expect(patchResponse.ok()).toBeTruthy();

  const patchBody = await patchResponse.json();

  expect(patchBody.firstname).toBe(
    BookingData.partialBooking.firstname
  );

  expect(patchBody.additionalneeds).toBe(
    BookingData.partialBooking.additionalneeds
  );

  ===========================
  Prueba 3 - DELETE
  ===========================

  const deleteResponse = await bookingService.deleteBooking(
    bookingId,
    token
  );

  expect(deleteResponse.status()).toBe(201);
  */
});