export function loadSchedules<T>(
  storageKey: string
): T[] {
  const data = localStorage.getItem(storageKey);

  if (!data) {
    return [];
  }

  try {
    return JSON.parse(data) as T[];
  } catch {
    return [];
  }
}

export function saveSchedule<T extends { id: string }>(
  storageKey: string,
  schedule: T
) {
  const schedules =
    loadSchedules<T>(storageKey);

  const index = schedules.findIndex(
    (item) => item.id === schedule.id
  );

  if (index >= 0) {
    schedules[index] = schedule;
  } else {
    schedules.push(schedule);
  }

  localStorage.setItem(
    storageKey,
    JSON.stringify(schedules)
  );
}

export function deleteSchedule(
  storageKey: string,
  id: string
) {
  const schedules = loadSchedules<any>(
    storageKey
  ).filter(
    (item) => item.id !== id
  );

  localStorage.setItem(
    storageKey,
    JSON.stringify(schedules)
  );
}