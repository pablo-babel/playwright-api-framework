export class DateHelper {
  public static getCurrentDate(): string {
    return new Date().toISOString().split("T")[0];
  }

  public static getFutureDate(days: number): string {
    const date = new Date();

    date.setDate(date.getDate() + days);

    return date.toISOString().split("T")[0];
  }

  public static getPastDate(days: number): string {
    const date = new Date();

    date.setDate(date.getDate() - days);

    return date.toISOString().split("T")[0];
  }
}
