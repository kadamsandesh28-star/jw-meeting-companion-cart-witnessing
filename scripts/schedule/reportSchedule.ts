import { DailyReadingDefinition } from "../../src/data/bible/types";

export function reportSchedule(
  schedule: DailyReadingDefinition[]
): void {
  const histogram = new Map<number, number>();

  for (const day of schedule) {
    let chapters = 0;

    for (const passage of day.passages) {
      chapters +=
        passage.endChapter - passage.startChapter + 1;
    }

    histogram.set(
      chapters,
      (histogram.get(chapters) ?? 0) + 1
    );
  }

  console.log("");
  console.log("📊 Schedule Summary");
  console.log("------------------");

  [...histogram.entries()]
    .sort(([a], [b]) => a - b)
    .forEach(([count, days]) => {
      console.log(`${days} day(s) with ${count} chapters`);
    });

  console.log("");
}