export type SchedulePeriod =
  | "Morning"
  | "Afternoon"
  | "Evening";

export interface ScheduleItem {
  id: string;

  period: SchedulePeriod;

  time: string;

  activity: string;

  icon: string;

  completed: boolean;
}