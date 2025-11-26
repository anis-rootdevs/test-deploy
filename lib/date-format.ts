import { format, isValid, parseISO } from "date-fns";

export function formatReservationDate(
  dateString: string | Date,
  formatPattern: string = "MMM dd, yyyy 'at' hh:mm a"
): string {
  try {
    const date =
      typeof dateString === "string" ? parseISO(dateString) : dateString;

    if (!isValid(date)) {
      return "Invalid date";
    }

    return format(date, formatPattern);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
}
