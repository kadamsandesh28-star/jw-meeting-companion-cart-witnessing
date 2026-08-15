export interface BibleBookDefinition {
  name: string;
  chapters: number;
}

export interface DailyReadingPassage {
  book: string;
  startChapter: number;
  endChapter: number;

  startVerse?: number;
  endVerse?: number;
}

export interface DailyReadingDefinition {
  day: number;
  passages: DailyReadingPassage[];
}