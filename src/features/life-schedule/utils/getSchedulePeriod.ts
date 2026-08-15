import { SchedulePeriod } from "../models/ScheduleItem";

export function getSchedulePeriod(
  time: string
): SchedulePeriod {
  const hour = Number(time.split(":")[0]);

  if (hour < 12) {
    return "Morning";
  }

  if (hour < 17) {
    return "Afternoon";
  }

  return "Evening";
}