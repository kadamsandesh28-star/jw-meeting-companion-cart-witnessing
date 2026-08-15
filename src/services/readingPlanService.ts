import { bibleBooks } from "../data/bibleBooks";
import { createReadingPlan } from "../data/generators/readingPlanGenerator";
import { readingPlanRegistry } from "../data/plans/registry";

import type {
  ReadingBook,
  ReadingEntry,
  ScriptureSection,
} from "../types/bible";

const defaultPlan = readingPlanRegistry[0];

if (!defaultPlan) {
  throw new Error("No reading plans are registered.");
}

const bibleInOneYear = createReadingPlan(defaultPlan.schedule);

function getReadingPlan(): ReadingEntry[] {
  return bibleInOneYear;
}

function getReadingByIndex(index: number): ReadingEntry {
  return (
    bibleInOneYear[index] ??
    bibleInOneYear[bibleInOneYear.length - 1]
  );
}

function getTotalReadings(): number {
  return bibleInOneYear.length;
}

function getBooks(section?: ScriptureSection): string[] {
  return bibleBooks
    .filter((book) =>
      section ? book.section === section : true
    )
    .map((book) => book.name);
}

function getReadingsForBook(book: string): ReadingEntry[] {
  return bibleInOneYear.filter(
    (reading) => reading.book === book
  );
}

function getBooksWithReadings(
  section?: ScriptureSection
): ReadingBook[] {
  return bibleBooks
    .filter((book) =>
      section ? book.section === section : true
    )
    .map((book) => ({
      book: book.name,
      readings: getReadingsForBook(book.name),
    }));
}

function getSection(
  section: ScriptureSection
): ReadingEntry[] {
  return bibleInOneYear.filter(
    (reading) => reading.section === section
  );
}

function getBook(bookName: string) {
  return bibleBooks.find(
    (book) => book.name === bookName
  );
}

function getBookCount(section?: ScriptureSection) {
  return getBooks(section).length;
}

export const readingPlanService = {
  getReadingPlan,
  getReadingByIndex,
  getTotalReadings,
  getBooks,
  getReadingsForBook,
  getBooksWithReadings,
  getSection,
  getBook,
  getBookCount,
};