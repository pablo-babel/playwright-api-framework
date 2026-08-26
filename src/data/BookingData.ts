import { BookingRequest } from "../models/BookingRequest";

export const BookingData = {
  defaultBooking: {
    firstname: "Jim",
    lastname: "Brown",
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: "2026-01-01",
      checkout: "2026-01-05",
    },
    additionalneeds: "Breakfast",
  } as BookingRequest,

  updatedBooking: {
    firstname: "James",
    lastname: "Brown",
    totalprice: 250,
    depositpaid: false,
    bookingdates: {
      checkin: "2026-02-01",
      checkout: "2026-02-10",
    },
    additionalneeds: "Lunch",
  } as BookingRequest,

  partialBooking: {
    firstname: "Peter",
    additionalneeds: "Dinner",
  },
};
