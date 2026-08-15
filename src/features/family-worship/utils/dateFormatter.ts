/**
 * Formats a date string (YYYY-MM-DD) into a long, readable format.
 * Example: Wednesday, 5 August 2026
 */
export function formatSessionDate(
  date: string
): string {
  if (!date) return "";

  const value = new Date(`${date}T00:00:00`);

  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(value);
}

/**
 * Formats a 24-hour time (HH:mm) into a 12-hour format.
 * Example: 19:00 -> 7:00 PM
 */
export function formatSessionTime(
  time: string
): string {
  if (!time) return "";

  const [hours, minutes] = time.split(":").map(Number);

  const value = new Date();
  value.setHours(hours, minutes, 0, 0);

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(value);
}

/**
 * Formats date and time together.
 * Example:
 * Wednesday, 5 August 2026 • 7:00 PM
 */
export function formatSessionDateTime(
  date: string,
  time: string
): string {
  const formattedDate =
    formatSessionDate(date);

  const formattedTime =
    formatSessionTime(time);

  if (!formattedDate) return formattedTime;
  if (!formattedTime) return formattedDate;

  return `${formattedDate} • ${formattedTime}`;
}

/**
 * Returns true if the scheduled session is in the past.
 */
export function isSessionPast(
  date: string,
  time: string
): boolean {
  if (!date || !time) return false;

  return (
    new Date(`${date}T${time}`).getTime() <
    Date.now()
  );
}

/**
 * Returns true if the session is today.
 */
export function isSessionToday(
  date: string
): boolean {
  if (!date) return false;

  const today = new Date();

  const todayString =
    today.toISOString().split("T")[0];

  return date === todayString;
}

/**
 * Returns true if the session is tomorrow.
 */
export function isSessionTomorrow(
  date: string
): boolean {
  if (!date) return false;

  const tomorrow = new Date();

  tomorrow.setDate(
    tomorrow.getDate() + 1
  );

  const tomorrowString =
    tomorrow.toISOString().split("T")[0];

  return date === tomorrowString;
}