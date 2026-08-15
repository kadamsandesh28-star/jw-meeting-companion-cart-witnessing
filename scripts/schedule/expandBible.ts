import { bibleBooks } from "../../src/data/bible/books";
import { ChapterReference } from "./types";

export function expandBible(): ChapterReference[] {
  const chapters: ChapterReference[] = [];

  for (const book of bibleBooks) {
    for (let chapter = 1; chapter <= book.chapters; chapter++) {
      chapters.push({
        book: book.name,
        chapter,
      });
    }
  }

  return chapters;
}