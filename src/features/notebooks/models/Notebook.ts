export type NotebookType =
  | "Personal Notes"
  | "Spiritual Journal"
  | "Bible Reading Notes"
  | "Bible Study Notes"
  | "Meeting Comments"
  | "Talk Outline"
  | "Family Worship"
  | "Assembly Notebook"
  | "Convention Notebook"
  | "Blank Notebook";

export interface Notebook {
  id: string;

  title: string;

  type: NotebookType;

  description: string;

  favorite: boolean;

  archived: boolean;

  pinned: boolean;

  createdAt: string;

  updatedAt: string;
}