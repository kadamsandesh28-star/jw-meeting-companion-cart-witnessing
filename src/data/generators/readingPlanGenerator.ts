import { bibleBooks } from "../bible/books";
import {
  BibleBook,
  ReadingEntry,
  ScriptureSection,
} from "../../types/bible";
import { DailyReadingDefinition } from "../bible/types";
import { ReadingRangeDefinition } from "../../types/readingPlan";

function getSection(bookName: string): ScriptureSection {
  const book = bibleBooks.find(
    (b) => b.name === bookName
  ) as BibleBook | undefined;

  if (!book) {
    throw new Error(`Unknown Bible book: ${bookName}`);
  }

  return book.section;
}

function isDailyReadingDefinitionArray(
  value: DailyReadingDefinition[] | ReadingRangeDefinition[]
): value is DailyReadingDefinition[] {
  return (
    value.length === 0 ||
    (value[0] as DailyReadingDefinition).passages !== undefined
  );
}

export function createReadingPlan(
  definitions: DailyReadingDefinition[] | ReadingRangeDefinition[]
): ReadingEntry[] {
  const readings: ReadingEntry[] = [];
  let id = 1;

  if (isDailyReadingDefinitionArray(definitions)) {
    // New schedule-based format
    for (const day of definitions) {
      for (const passage of day.passages) {
        readings.push({
          id: id++,
          section: getSection(passage.book),
          book: passage.book,
          startChapter: passage.startChapter,
          endChapter: passage.endChapter,
        });
      }
    }
  } else {
    // Legacy range-based format
    for (const definition of definitions) {
      const section = getSection(definition.book);

      for (const [startChapter, endChapter] of definition.ranges) {
        readings.push({
          id: id++,
          section,
          book: definition.book,
          startChapter,
          endChapter,
        });
      }
    }
  }

  return readings;
}