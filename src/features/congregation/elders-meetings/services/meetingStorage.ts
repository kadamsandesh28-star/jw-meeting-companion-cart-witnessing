import type { AgendaItem } from "../models/AgendaItem";

export interface MeetingData {
  agenda: AgendaItem[];
}

const STORAGE_KEY = "jw-elders-meeting";

export const meetingStorage = {
  load(): MeetingData {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return {
        agenda: [],
      };
    }

    try {
      return JSON.parse(raw);
    } catch {
      return {
        agenda: [],
      };
    }
  },

  save(data: MeetingData) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(data)
    );
  },

  clear() {
    localStorage.removeItem(STORAGE_KEY);
  },
};