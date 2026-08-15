export type EventCategory =
  | "Meeting"
  | "Assembly"
  | "Convention"
  | "Personal"
  | "Reminder";

export interface DashboardEvent {
  id: string;
  title: string;

  /**
   * Date in ISO format (YYYY-MM-DD)
   */
  date: string;

  /**
   * Time in 24-hour format (HH:mm)
   * Example: "19:00"
   */
  time: string;

  category: EventCategory;

  notes?: string;
}