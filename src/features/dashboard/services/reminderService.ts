import { Reminder } from "../models/Reminder";

const STORAGE_KEY = "jw-reminders";

export const reminderService = {
  getAll(): Reminder[] {
    const json = localStorage.getItem(STORAGE_KEY);

    if (!json) {
      return [
        {
          id: "1",
          title: "Family Worship",
          subtitle: "Today 7:00 PM",
          badge: "Today",
          completed: false,
          icon: "family",
        },
        {
          id: "2",
          title: "Bible Reading",
          subtitle: "Daily Goal",
          badge: "Daily",
          completed: false,
          icon: "bible",
        },
        {
          id: "3",
          title: "Congregation Meeting",
          subtitle: "Thursday 7:00 PM",
          badge: "3 Days",
          completed: false,
          icon: "meeting",
        },
      ];
    }

    return JSON.parse(json);
  },

  saveAll(reminders: Reminder[]) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(reminders)
    );
  },
};