export type ReminderType =
  | "meeting"
  | "family"
  | "bible"
  | "report"
  | "calendar";

export interface Reminder {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  completed: boolean;
  icon: ReminderType;
}