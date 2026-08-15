export interface MonthlyReport {
  month: string;
  hours: number;
  sessions: number;
  returnVisits: number;
  bibleStudies: number;
  placements: number;
  videosShown: number;
}

export type MinistryParticipation =
  | "Publisher"
  | "Auxiliary Pioneer"
  | "Regular Pioneer"
  | "Special Pioneer"
  | "Field Missionary";

export interface FieldServiceReportData {
  publisherName: string;

  month: string;
  year: number;

  participation: MinistryParticipation;

  hours: number;
  bibleStudies: number;

  comments: string;
}