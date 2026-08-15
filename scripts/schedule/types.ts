export interface ChapterReference {
  book: string;
  chapter: number;
}

export interface BalancedDay {
  day: number;
  chapters: ChapterReference[];
}