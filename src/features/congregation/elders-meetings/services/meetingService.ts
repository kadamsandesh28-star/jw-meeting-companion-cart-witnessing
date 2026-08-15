import type { Meeting } from "../models/Meeting";

const STORAGE_KEY = "jw-body-of-elders-meetings";

class MeetingService {
  getAll(): Meeting[] {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
      return [];
    }

    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  getById(id: string) {
    return this.getAll().find(
      (meeting) => meeting.id === id
    );
  }

  save(meeting: Meeting) {
    const meetings = this.getAll();

    const existingIndex =
      meetings.findIndex(
        (m) => m.id === meeting.id
      );

    if (existingIndex >= 0) {
      meetings[existingIndex] = {
        ...meeting,
        updatedAt:
          new Date().toISOString(),
      };
    } else {
      meetings.unshift(meeting);
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(meetings)
    );
  }

  delete(id: string) {
    const meetings =
      this.getAll().filter(
        (m) => m.id !== id
      );

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(meetings)
    );
  }
}

export const meetingService =
  new MeetingService();