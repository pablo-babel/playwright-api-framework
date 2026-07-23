import { expect, test } from "@playwright/test";
import { AuthService } from "../../src/services/AuthService";
import { BookingService } from "../../src/services/BookingService";

test("PUT /booking/{id} should update a booking", async () => {
  const authService = new AuthService();
  const bookingService = new BookingService();

  // Obtener token
  const authResponse = await authService.login("admin", "password123");
  expect(authResponse.ok()).toBeTruthy();

  const authBody = await authResponse.json();
  const token = authBody.token;

  // Crear booking
  const bookingData = {
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

  /* 
  // Inicio Prueba 1 - PUT

  const updatedBooking = {
    firstname: "James",
    lastname: "Brown",
    totalprice: 250,
    depositpaid: false,
    bookingdates: {
      checkin: "2026-02-01",
      checkout: "2026-02-10"
    },
    additionalneeds: "Lunch"
  };

  const updateResponse = await bookingService.updateBooking(
    bookingId,
    updatedBooking,
    token
  );

  expect(updateResponse.ok()).toBeTruthy();

  const body = await updateResponse.json();

  expect(body.firstname).toBe("James");
  expect(body.totalprice).toBe(250);
  expect(body.depositpaid).toBe(false);

  //Inicio Prueba 2 - PATCH
  
 const partialBooking = {
  firstname: "Peter",
  additionalneeds: "Dinner"
};

const patchResponse = await bookingService.partialUpdateBooking(
  bookingId,
  partialBooking,
  token
);

expect(patchResponse.ok()).toBeTruthy();

const body = await patchResponse.json();

expect(body.firstname).toBe("Peter");
expect(body.additionalneeds).toBe("Dinner");
*/

//Inicio Prueba 3 - DELETE

const deleteResponse = await bookingService.deleteBooking(
  bookingId,
  token
);

expect(deleteResponse.status()).toBe(201);

});     