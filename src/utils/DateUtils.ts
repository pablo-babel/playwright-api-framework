export class DateUtils {
  public static addDays(days: number): string {
    const date = new Date();

    date.setDate(date.getDate() + days);

    return date.toISOString().split("T")[0];
  }
}