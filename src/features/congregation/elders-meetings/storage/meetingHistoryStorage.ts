import type { Meeting } from "../models/Meeting";

const STORAGE_KEY = "eldersMeetingHistory";

function getMeetings(): Meeting[] {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveMeetings(meetings: Meeting[]) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(meetings)
  );
}

export const meetingHistoryStorage = {
  getAll(): Meeting[] {
    return getMeetings();
  },

  getById(id: string) {
    return getMeetings().find(
      (meeting) => meeting.id === id
    );
  },

  create(meeting: Meeting) {
    const meetings = getMeetings();

    meetings.unshift(meeting);

    saveMeetings(meetings);
  },

  update(updatedMeeting: Meeting) {
    const meetings = getMeetings().map(
      (meeting) =>
        meeting.id === updatedMeeting.id
          ? updatedMeeting
          : meeting
    );

    saveMeetings(meetings);
  },

  delete(id: string) {
    const meetings = getMeetings().filter(
      (meeting) => meeting.id !== id
    );

    saveMeetings(meetings);
  },

  clear() {
    localStorage.removeItem(STORAGE_KEY);
  },
};