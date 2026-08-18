import { test } from "@playwright/test";
import { BookingService } from "../../src/services/BookingService";
import { BookingFactory } from "../../src/factories/BookingFactory";
import { ResponseValidator } from "../../src/validators/ResponseValidator";


// ============================================================
// 403 - FORBIDDEN
// ============================================================

test("PUT /booking/{id} should return 403 with an invalid token", async () => {
  const bookingService = new BookingService();

  const bookingData = BookingFactory.create();

  // Crear booking válido
  const createResponse = await bookingService.createBooking(
    bookingData
  );

  ResponseValidator.expectStatus(createResponse, 200);

  const createdBooking = await createResponse.json();

  const bookingId = createdBooking.bookingid;

  // Token inválido
  const invalidToken = "invalid-token";

  // Intentar actualizar el booking
  const updateResponse = await bookingService.updateBooking(
    bookingId,
    bookingData,
    invalidToken
  );

  // Restful Booker devuelve 403
  ResponseValidator.expectStatus(updateResponse, 403);
});


// ============================================================
// 404 - NOT FOUND
// ============================================================

test("GET /booking/{id} should return 404 for a non-existing booking", async () => {
  const bookingService = new BookingService();

  // ID que no debería existir
  const nonExistingBookingId = 999999999;

  const response = await bookingService.getBooking(
    nonExistingBookingId
  );

  ResponseValidator.expectStatus(response, 404);
});