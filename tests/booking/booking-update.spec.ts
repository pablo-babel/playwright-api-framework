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

  const authBody = await authResponse.json();
  const token = authBody.token;

  // Crear booking
  const createResponse = await bookingService.createBooking(
    BookingData.defaultBooking
  );

  expect(createResponse.ok()).toBeTruthy();

  const createdBooking = await createResponse.json();
  const bookingId = createdBooking.bookingid;

  /*
  // Inicio Prueba 1 - PUT

  const updateResponse = await bookingService.updateBooking(
    bookingId,
    BookingData.updatedBooking,
    token
  );

  expect(updateResponse.ok()).toBeTruthy();

  const body = await updateResponse.json();

  expect(body.firstname).toBe(
    BookingData.updatedBooking.firstname
  );

  expect(body.totalprice).toBe(
    BookingData.updatedBooking.totalprice
  );

  expect(body.depositpaid).toBe(
    BookingData.updatedBooking.depositpaid
  );

  // Inicio Prueba 2 - PATCH

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
  */

  // Inicio Prueba 3 - DELETE

  const deleteResponse = await bookingService.deleteBooking(
    bookingId,
    token
  );

  expect(deleteResponse.status()).toBe(201);
});