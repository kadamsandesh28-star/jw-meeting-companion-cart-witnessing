export interface MeetingPreparationItem {
  id: string;
  title: string;
  completed: boolean;
}

const STORAGE_KEY = "jw-meeting-preparation";

const DEFAULT_ITEMS: MeetingPreparationItem[] = [
  {
    id: "workbook",
    title: "Check Meeting Workbook",
    completed: false,
  },
  {
    id: "watchtower",
    title: "Check Watchtower",
    completed: false,
  },
  {
    id: "assignments",
    title: "Check my assignments",
    completed: false,
  },
  {
    id: "prepare-assignment",
    title: "Prepare my assignment",
    completed: false,
  },
  {
    id: "final-check",
    title: "Final meeting check",
    completed: false,
  },
];

interface StoredMeetingPreparation {
  weekKey: string;
  items: MeetingPreparationItem[];
}

function getWeekKey(): string {
  const today = new Date();

  const date = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const day = date.getDay();

  const difference =
    day === 0 ? -6 : 1 - day;

  date.setDate(
    date.getDate() + difference
  );

  const year = date.getFullYear();
  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");
  const dayOfMonth = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${dayOfMonth}`;
}

function createDefaultItems(): MeetingPreparationItem[] {
  return DEFAULT_ITEMS.map((item) => ({
    ...item,
  }));
}

export function loadMeetingPreparation(): MeetingPreparationItem[] {
  try {
    const saved =
      localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return createDefaultItems();
    }

    const parsed =
      JSON.parse(saved) as StoredMeetingPreparation;

    const currentWeekKey =
      getWeekKey();

    if (
      !parsed ||
      parsed.weekKey !== currentWeekKey ||
      !Array.isArray(parsed.items)
    ) {
      return createDefaultItems();
    }

    return DEFAULT_ITEMS.map(
      (defaultItem) => {
        const savedItem =
          parsed.items.find(
            (item) =>
              item.id === defaultItem.id
          );

        return {
          ...defaultItem,
          completed:
            savedItem?.completed ?? false,
        };
      }
    );
  } catch {
    return createDefaultItems();
  }
}

export function saveMeetingPreparation(
  items: MeetingPreparationItem[]
): void {
  try {
    const data: StoredMeetingPreparation = {
      weekKey: getWeekKey(),
      items,
    };

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(data)
    );
  } catch (error) {
    console.warn(
      "Unable to save meeting preparation:",
      error
    );
  }
}

export function toggleMeetingPreparationItem(
  id: string
): MeetingPreparationItem[] {
  const current =
    loadMeetingPreparation();

  const updated = current.map(
    (item) =>
      item.id === id
        ? {
            ...item,
            completed: !item.completed,
          }
        : item
  );

  saveMeetingPreparation(updated);

  return updated;
}

export function getMeetingPreparationProgress(): {
  completed: number;
  total: number;
  percentage: number;
} {
  const items =
    loadMeetingPreparation();

  const completed =
    items.filter(
      (item) => item.completed
    ).length;

  const total = items.length;

  return {
    completed,
    total,
    percentage:
      total === 0
        ? 0
        : (completed / total) * 100,
  };
}