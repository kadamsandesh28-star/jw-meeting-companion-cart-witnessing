import { BalancedDay, ChapterReference } from "./types";

export function balanceDays(
  chapters: ChapterReference[],
  totalDays: number
): BalancedDay[] {
  if (totalDays <= 0) {
    throw new Error("totalDays must be greater than zero.");
  }

  const totalChapters = chapters.length;

  const base = Math.floor(totalChapters / totalDays);
  const extra = totalChapters % totalDays;

  const days: BalancedDay[] = [];

  let chapterIndex = 0;
  let accumulator = 0;

  for (let day = 1; day <= totalDays; day++) {
    let chaptersToday = base;

    accumulator += extra;

    if (accumulator >= totalDays) {
      chaptersToday++;
      accumulator -= totalDays;
    }

    days.push({
      day,
      chapters: chapters.slice(
        chapterIndex,
        chapterIndex + chaptersToday
      ),
    });

    chapterIndex += chaptersToday;
  }

  return days;
}