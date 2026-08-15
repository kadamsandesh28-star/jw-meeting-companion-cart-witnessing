import { readingPlanService } from "./readingPlanService";
import { STORAGE_KEYS } from "../constants/storageKeys";

import type {
  BibleReadingProgress,
  ReadingEntry,
} from "../types/bible";

const defaultProgress: BibleReadingProgress = {
  lastCompletedDate: null,
  currentReadingIndex: 0,
  completedReadings: {},
  streak: 0,
  notes: "",
};

function todayString(): string {
  return new Date().toISOString().split("T")[0];
}

function daysBetween(date1: string, date2: string): number {
  const first = new Date(date1);
  const second = new Date(date2);

  return Math.floor(
    (second.getTime() - first.getTime()) /
      (1000 * 60 * 60 * 24)
  );
}

function migrateProgress(data: any): BibleReadingProgress {
  if (
    data.completedReadings &&
    typeof data.completedReadings === "object" &&
    !Array.isArray(data.completedReadings)
  ) {
    return {
      ...defaultProgress,
      ...data,
    };
  }

  const completed: Record<number, string> = {};

  const completedCount =
    typeof data.completedReadings === "number"
      ? data.completedReadings
      : 0;

  for (let i = 0; i < completedCount; i++) {
    completed[i] = data.lastCompletedDate ?? "";
  }

  return {
    ...defaultProgress,
    ...data,
    completedReadings: completed,
  };
}

function getProgress(): BibleReadingProgress {
  const saved = localStorage.getItem(
    STORAGE_KEYS.bibleReadingProgress
  );

  if (!saved) {
    return defaultProgress;
  }

  try {
    return migrateProgress(JSON.parse(saved));
  } catch {
    return defaultProgress;
  }
}

function saveProgress(progress: BibleReadingProgress): void {
  localStorage.setItem(
    STORAGE_KEYS.bibleReadingProgress,
    JSON.stringify(progress)
  );
}

function getCurrentReading(): ReadingEntry {
  return readingPlanService.getReadingByIndex(
    getProgress().currentReadingIndex
  );
}

function completedToday(): boolean {
  return getProgress().lastCompletedDate === todayString();
}

function isReadingCompleted(id: number): boolean {
  return getProgress().completedReadings[id] !== undefined;
}

function getCompletedReadingIds(): number[] {
  return Object.keys(getProgress().completedReadings).map(Number);
}

function toggleReading(id: number): BibleReadingProgress {
  const progress = getProgress();

  const completedReadings = {
    ...progress.completedReadings,
  };

  if (completedReadings[id]) {
    delete completedReadings[id];
  } else {
    completedReadings[id] = todayString();
  }

  const updated = {
    ...progress,
    completedReadings,
  };

  saveProgress(updated);

  return updated;
}

function markTodayComplete(): BibleReadingProgress {
  const progress = getProgress();

  const today = todayString();

  if (progress.lastCompletedDate === today) {
    return progress;
  }

  let streak = 1;

  if (progress.lastCompletedDate) {
    const days = daysBetween(progress.lastCompletedDate, today);

    if (days === 1) {
      streak = progress.streak + 1;
    }
  }

  const completedReadings = {
    ...progress.completedReadings,
    [progress.currentReadingIndex]: today,
  };

  const nextIndex = Math.min(
    progress.currentReadingIndex + 1,
    readingPlanService.getTotalReadings() - 1
  );

  const updated = {
    ...progress,
    lastCompletedDate: today,
    currentReadingIndex: nextIndex,
    completedReadings,
    streak,
  };

  saveProgress(updated);

  return updated;
}

function updateNotes(notes: string): BibleReadingProgress {
  const updated = {
    ...getProgress(),
    notes,
  };

  saveProgress(updated);

  return updated;
}

function resetProgress(): void {
  saveProgress(defaultProgress);
}

export const bibleReadingService = {
  getProgress,
  saveProgress,
  getCurrentReading,
  completedToday,
  markTodayComplete,
  updateNotes,
  resetProgress,

  isReadingCompleted,
  getCompletedReadingIds,
  toggleReading,
};