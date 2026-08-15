export type BibleStudyStatus =
  | "Active"
  | "Inactive"
  | "Completed";

export interface BibleStudy {
  id: string;

  // Student Information
  studentName: string;
  contactNumber?: string;
  email?: string;
  address: string;

  // Study Information
  publication: string;
  currentLesson: number;
  nextStudyDate: string;
  status: BibleStudyStatus;

  // Notes
  notes: string;

  // Audit
  createdAt: string;
  updatedAt: string;
}

export interface BibleStudyStatistics {
  total: number;
  active: number;
  inactive: number;
  completed: number;
}