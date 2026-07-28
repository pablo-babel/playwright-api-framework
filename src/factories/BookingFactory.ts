import { faker } from "@faker-js/faker";
import { BookingRequest } from "../models/BookingRequest";

export class BookingFactory {

  public static create(): BookingRequest {

    return {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      totalprice: faker.number.int({
        min: 100,
        max: 500
      }),
      depositpaid: faker.datatype.boolean(),
      bookingdates: {
        checkin: "2026-01-01",
        checkout: "2026-01-05"
      },
      additionalneeds: faker.helpers.arrayElement([
        "Breakfast",
        "Lunch",
        "Dinner",
        "Late Checkout"
      ])
    };

  }

}