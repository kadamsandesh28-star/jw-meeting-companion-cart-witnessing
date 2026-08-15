import { MidweekMeetingSchedule } from "../models/MidweekMeetingSchedule";

const STORAGE_KEY = "jw-midweek-meeting-schedules";

export function loadSchedules(): MidweekMeetingSchedule[] {
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
  schedule: MidweekMeetingSchedule
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

export function deleteSchedule(
  id: string
) {
  const schedules = loadSchedules().filter(
    (item) => item.id !== id
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(schedules)
  );
}