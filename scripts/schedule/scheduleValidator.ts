import { DailyReadingDefinition } from "../../src/data/bible/types";

export function validateSchedule(
  schedule: DailyReadingDefinition[]
): void {
  if (schedule.length !== 365) {
    throw new Error(
      `Expected 365 schedule days, found ${schedule.length}.`
    );
  }

  const seenDays = new Set<number>();

  for (const day of schedule) {
    if (seenDays.has(day.day)) {
      throw new Error(`Duplicate day number: ${day.day}`);
    }

    seenDays.add(day.day);

    if (day.passages.length === 0) {
      throw new Error(`Day ${day.day} contains no passages.`);
    }
  }

  console.log("✅ Schedule validation passed");
}