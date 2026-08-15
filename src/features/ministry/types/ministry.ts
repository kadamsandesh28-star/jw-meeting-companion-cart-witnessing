/**
 * JW Meeting Companion
 * Ministry Domain Models
 */

export interface MinistrySession {
  id: string;

  date: string;

  startTime: string;

  endTime: string;

  companion: string;

  territory: string;

  returnVisits: number;

  bibleStudies: number;

  placements: number;

  videosShown: number;

  notes: string;

  createdAt: string;

  updatedAt: string;
}

export interface MinistryStatistics {
  totalHours: number;

  totalSessions: number;

  totalReturnVisits: number;

  totalBibleStudies: number;

  totalPlacements: number;

  totalVideosShown: number;
}

export interface MinistryFormData {
  date: string;

  startTime: string;

  endTime: string;

  companion: string;

  territory: string;

  returnVisits: number;

  bibleStudies: number;

  placements: number;

  videosShown: number;

  notes: string;
}