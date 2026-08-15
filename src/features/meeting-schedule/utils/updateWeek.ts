import { MidweekMeetingWeek } from "../models/MidweekMeetingSchedule";

export function updateWeekField<
  K extends keyof MidweekMeetingWeek
>(
  week: MidweekMeetingWeek,
  key: K,
  value: MidweekMeetingWeek[K]
): MidweekMeetingWeek {
  return {
    ...week,
    [key]: value,
  };
}