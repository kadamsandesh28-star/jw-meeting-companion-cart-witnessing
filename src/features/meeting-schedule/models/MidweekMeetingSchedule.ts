export interface MidweekMeetingWeek {
  id: string;

  weekNumber: number;

  meetingDate: string;

  bibleReading: string;

  chairman: string;

  auxiliaryCounselor: string;

  openingSong: string;

  openingPrayer: string;

  openingComments: string;

  treasuresTalkTitle: string;
  treasuresTalkTime: string;
  treasuresTalkBrother: string;

  spiritualGemsTime: string;
  spiritualGemsBrother: string;

  bibleReadingTime: string;
  bibleReadingStudent: string;
  bibleReadingAssistant: string;

  applyAssignments: {
    title: string;
    time: string;
    student: string;
    assistant: string;
  }[];

  middleSong: string;

  christianLifeParts: {
    title: string;
    time: string;
    speaker: string;
  }[];

  congregationBibleStudyTime: string;
  congregationBibleStudyConductor: string;
  congregationBibleStudyReader: string;

  concludingComments: string;

  closingSong: string;
  closingPrayer: string;
}

export interface MidweekMeetingSchedule {
  id: string;

  month: string;

  title: string;

  weeks: MidweekMeetingWeek[];

  createdAt: number;

  updatedAt: number;
}