import { MediaAttachment } from "./MediaAttachment";

export interface WorshipTemplate {
  id: string;

  name: string;

  description: string;

  category: string;

  icon: string;

  color: string;

  title: string;

  theme: string;

  bibleReading: string;

  openingSong: string;

  closingSong: string;

  discussionQuestions: string[];

  defaultGoals: string[];

  suggestedMedia: MediaAttachment[];

  favorite: boolean;
}