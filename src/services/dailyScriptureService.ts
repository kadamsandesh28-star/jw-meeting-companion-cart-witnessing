export interface DailyScriptureEntry {
  id: string;
  date: string;
  scripture: string;
  theme: string;
  meditation: string;
  application: string;
}

const STORAGE_KEY = "jw-daily-scriptures";

export function loadEntries(): DailyScriptureEntry[] {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return [];
  }

  return JSON.parse(saved);
}

export function saveEntries(
  entries: DailyScriptureEntry[]
) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(entries)
  );
}

export function getTodayEntry(): DailyScriptureEntry {
  const today =
    new Date().toISOString().split("T")[0];

  const entries = loadEntries();

  const existing = entries.find(
    (entry) => entry.date === today
  );

  if (existing) {
    return existing;
  }

  return {
    id: crypto.randomUUID(),
    date: today,
    scripture: "",
    theme: "",
    meditation: "",
    application: "",
  };
}

export function saveTodayEntry(
  entry: DailyScriptureEntry
) {
  const entries = loadEntries();

  const index = entries.findIndex(
    (item) => item.id === entry.id
  );

  if (index >= 0) {
    entries[index] = entry;
  } else {
    entries.unshift(entry);
  }

  saveEntries(entries);
}

/* Dashboard */

export function hasTodayReflection(): boolean {
  const entry = getTodayEntry();

  return (
    entry.scripture.trim() !== "" ||
    entry.theme.trim() !== "" ||
    entry.meditation.trim() !== "" ||
    entry.application.trim() !== ""
  );
}

export function getTodayReflectionSummary() {
  const entry = getTodayEntry();

  return {
    started: hasTodayReflection(),
    scripture: entry.scripture,
    theme: entry.theme,
    date: entry.date,
  };
}

export function getReflectionCount() {
  return loadEntries().length;
}

export function getRecentReflections(
  limit = 5
) {
  return loadEntries().slice(0, limit);
}

/* Statistics */

export interface ReflectionStatistics {
  total: number;
  latestDate: string;
}

export function getReflectionStatistics(): ReflectionStatistics {
  const entries = loadEntries();

  return {
    total: entries.length,
    latestDate:
      entries.length > 0
        ? entries[0].date
        : "No reflections yet",
  };
}