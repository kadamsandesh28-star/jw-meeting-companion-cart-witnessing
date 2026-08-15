import { MeetingTimer } from "../data/meetingTimers";

const STORAGE_KEY = "jw-meeting-timers";

export function loadMeetingTimers(
  defaults: MeetingTimer[]
): MeetingTimer[] {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) return defaults;

  return JSON.parse(saved);
}

export function saveMeetingTimers(
  timers: MeetingTimer[]
) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(timers)
  );
}