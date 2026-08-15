import { DailyReadingDefinition } from "../../src/data/bible/types";
import { expandBible } from "./expandBible";

export function verifyCoverage(
  schedule: DailyReadingDefinition[]
): void {
  const expected = expandBible();

  const generated: { book: string; chapter: number }[] = [];

  for (const day of schedule) {
    for (const passage of day.passages) {
      for (
        let chapter = passage.startChapter;
        chapter <= passage.endChapter;
        chapter++
      ) {
        generated.push({
          book: passage.book,
          chapter,
        });
      }
    }
  }

  if (generated.length !== expected.length) {
    throw new Error(
      `Expected ${expected.length} chapters but generated ${generated.length}.`
    );
  }

  for (let i = 0; i < expected.length; i++) {
    const e = expected[i];
    const g = generated[i];

    if (
      e.book !== g.book ||
      e.chapter !== g.chapter
    ) {
      throw new Error(
        `Coverage mismatch at index ${i}.
Expected ${e.book} ${e.chapter}
Received ${g.book} ${g.chapter}`
      );
    }
  }

  console.log("✅ Chapter coverage verified");
}