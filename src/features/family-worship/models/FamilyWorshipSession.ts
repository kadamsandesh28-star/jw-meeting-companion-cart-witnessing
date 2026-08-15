import { MediaAttachment } from "./MediaAttachment";

export interface FamilyGoal {
  id: string;
  title: string;
  completed: boolean;
}

export type FamilyWorshipCategory =
  | "family-worship"
  | "personal-study"
  | "meeting-preparation";

export interface FamilyWorshipSession {
  id: string;

  title: string;

  theme: string;

  /**
   * Scheduled date (YYYY-MM-DD)
   */
  scheduledDate: string;

  /**
   * Scheduled time (24-hour format HH:mm)
   */
  scheduledTime: string;

  /**
   * Session category
   */
  category: FamilyWorshipCategory;

  bibleReading: string;

  openingSong: string;

  openingPrayer: string;

  discussionQuestions: string[];

  media: MediaAttachment[];

  notes: string;

  goals: FamilyGoal[];

  closingSong: string;

  closingPrayer: string;

  favorite: boolean;

  completed: boolean;

  createdAt: number;

  updatedAt: number;
}