import { WeekendMeetingSchedule } from "../models/WeekendMeetingSchedule";

const STORAGE_KEY = "jw-weekend-meeting-schedules";

export function loadSchedules(): WeekendMeetingSchedule[] {
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

export function saveSchedule(
  schedule: WeekendMeetingSchedule
) {
  const schedules = loadSchedules();

  const index = schedules.findIndex(
    (item) => item.id === schedule.id
  );

  if (index >= 0) {
    schedules[index] = schedule;
  } else {
    schedules.push(schedule);
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(schedules)
  );
}

export function deleteSchedule(id: string) {
  const schedules = loadSchedules().filter(
    (item) => item.id !== id
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(schedules)
  );
}