import { bibleBooks } from "../src/data/bible/books";
import { DailyReadingDefinition } from "../src/data/bible/types";

export function validateReadingPlan(
  schedule: DailyReadingDefinition[]
): void {
  const errors: string[] = [];

  for (const day of schedule) {
    for (const passage of day.passages) {
      const book = bibleBooks.find((b) => b.name === passage.book);

      if (!book) {
        errors.push(
          `Day ${day.day}: Unknown book "${passage.book}"`
        );
        continue;
      }

      if (passage.startChapter > passage.endChapter) {
        errors.push(
          `Day ${day.day}: ${passage.book} ${passage.startChapter}-${passage.endChapter} has start > end`
        );
      }

      if (
        passage.startChapter < 1 ||
        passage.endChapter > book.chapters
      ) {
        errors.push(
          `Day ${day.day}: ${passage.book} ${passage.startChapter}-${passage.endChapter} exceeds ${book.chapters} chapters`
        );
      }
    }
  }

  if (errors.length > 0) {
    console.error("\n❌ Validation failed:\n");

    for (const error of errors) {
      console.error(`• ${error}`);
    }

    process.exit(1);
  }

  console.log("✅ Reading plan validation passed");
}