import { BookingRequest } from "../models/BookingRequest";
import { BookingFactory } from "../factories/BookingFactory";

export class BookingBuilder {

  private booking: BookingRequest;

  constructor() {
    this.booking = BookingFactory.create();
  }

  public withFirstname(firstname: string): BookingBuilder {
    this.booking.firstname = firstname;
    return this;
  }

  public withLastname(lastname: string): BookingBuilder {
    this.booking.lastname = lastname;
    return this;
  }

  public withTotalPrice(totalprice: number): BookingBuilder {
    this.booking.totalprice = totalprice;
    return this;
  }

  public withDepositPaid(depositpaid: boolean): BookingBuilder {
    this.booking.depositpaid = depositpaid;
    return this;
  }

  public withAdditionalNeeds(additionalneeds: string): BookingBuilder {
    this.booking.additionalneeds = additionalneeds;
    return this;
  }

  public build(): BookingRequest {
    return this.booking;
  }

}