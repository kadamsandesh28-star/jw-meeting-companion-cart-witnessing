export type StudyType =
  | "Bible Study"
  | "Watchtower"
  | "Workbook"
  | "Family Worship"
  | "Public Talk"
  | "Return Visit"
  | "Blank";

export interface Study {
  id: string;

  title: string;

  type: StudyType;

  description: string;

  createdAt: string;

  updatedAt: string;

  favorite: boolean;

  archived: boolean;
}