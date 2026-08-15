export type ScriptureSection =
  | "Hebrew Scriptures"
  | "Greek Scriptures";

export interface ReadingEntry {
  /**
   * Unique reading identifier.
   */
  id: number;

  /**
   * Hebrew or Greek Scriptures.
   */
  section: ScriptureSection;

  /**
   * Bible book.
   */
  book: string;

  /**
   * Inclusive chapter range.
   */
  startChapter: number;
  endChapter: number;

  /**
   * Optional display title.
   */
  title?: string;

  /**
   * Approximate reading time in minutes.
   */
  estimatedMinutes?: number;

  /**
   * Optional deep link to the official jw.org page.
   */
  jwOrgUrl?: string;

  /**
   * Optional JW Library URI.
   *
   * This will allow opening the passage directly in
   * JW Library where supported.
   */
  jwLibraryUri?: string;

  /**
   * Optional keywords used for searching and filtering.
   */
  tags?: string[];
}

export interface ReadingBook {
  book: string;
  readings: ReadingEntry[];
}

export interface BibleBook {
  name: string;
  section: ScriptureSection;
  chapters: number;
}

export interface BibleReadingProgress {
  lastCompletedDate: string | null;

  /**
   * Sequential index of the next reading.
   * We'll remove this in a later sprint once the
   * progress model is fully derived from completedReadings.
   */
  currentReadingIndex: number;

  /**
   * Maps a reading id to the date it was completed.
   *
   * Example:
   * {
   *   1: "2026-07-22",
   *   2: "2026-07-23"
   * }
   */
  completedReadings: Record<number, string>;

  streak: number;

  /**
   * General notes for the reading plan.
   */
  notes: string;
}