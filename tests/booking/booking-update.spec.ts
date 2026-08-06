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

  // Actualizar booking
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
});

test("PATCH /booking/{id} should partially update a booking", async () => {
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

  // Actualización parcial
  const patchResponse =
    await bookingService.partialUpdateBooking(
      bookingId,
      BookingData.partialBooking,
      token
    );

  expect(patchResponse.ok()).toBeTruthy();
  expect(patchResponse.status()).toBe(200);

  const body = await patchResponse.json();

  // Validar campos modificados
  expect(body.firstname).toBe(
    BookingData.partialBooking.firstname
  );

  expect(body.additionalneeds).toBe(
    BookingData.partialBooking.additionalneeds
  );

  // Validar que los demás campos permanecen
  expect(body.lastname).toBe(
    BookingData.defaultBooking.lastname
  );

  expect(body.totalprice).toBe(
    BookingData.defaultBooking.totalprice
  );

  expect(body.depositpaid).toBe(
    BookingData.defaultBooking.depositpaid
  );

  expect(body.bookingdates.checkin).toBe(
    BookingData.defaultBooking.bookingdates.checkin
  );

  expect(body.bookingdates.checkout).toBe(
    BookingData.defaultBooking.bookingdates.checkout
  );
});

test("DELETE /booking/{id} should delete a booking", async () => {
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

  // Eliminar booking
  const deleteResponse = await bookingService.deleteBooking(
    bookingId,
    token
  );

  expect(deleteResponse.status()).toBe(201);

  // Verificar que ya no existe
  const getResponse = await bookingService.getBooking(
    bookingId
  );

  expect(getResponse.status()).toBe(404);
});