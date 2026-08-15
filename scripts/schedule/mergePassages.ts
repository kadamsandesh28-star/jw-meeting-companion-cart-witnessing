import { DailyReadingDefinition } from "../../src/data/bible/types";
import { BalancedDay } from "./types";

export function mergePassages(
  days: BalancedDay[]
): DailyReadingDefinition[] {
  return days.map((day) => {
    const passages: DailyReadingDefinition["passages"] = [];

    for (const chapter of day.chapters) {
      const last = passages[passages.length - 1];

      if (
        last &&
        last.book === chapter.book &&
        last.endChapter + 1 === chapter.chapter
      ) {
        // Extend the existing range.
        last.endChapter = chapter.chapter;
      } else {
        // Start a new range.
        passages.push({
          book: chapter.book,
          startChapter: chapter.chapter,
          endChapter: chapter.chapter,
        });
      }
    }

    return {
      day: day.day,
      passages,
    };
  });
}