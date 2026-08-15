import { ScheduleItem } from "../models/ScheduleItem";

const STORAGE_KEY = "life-schedule";

export const scheduleService = {
  getAll(): ScheduleItem[] {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
      return [];
    }

    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  saveAll(
    items: ScheduleItem[]
  ): void {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(items)
    );
  },

  clear(): void {
    localStorage.removeItem(
      STORAGE_KEY
    );
  },
};