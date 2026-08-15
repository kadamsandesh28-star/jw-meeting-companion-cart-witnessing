export interface WeekendMeetingWeek {
  id: string;

  weekNumber: number;

  meetingDate: string;

  chairman: string;

  openingSong: string;

  openingPrayer: string;

  publicTalkTheme: string;

  publicTalkSpeaker: string;

  middleSong: string;

  watchtowerReader: string;

  watchtowerConductor: string;

  closingSong: string;

  closingPrayer: string;
}

export interface WeekendMeetingSchedule {
  id: string;

  title: string;

  month: string;

  weeks: WeekendMeetingWeek[];

  createdAt: number;

  updatedAt: number;
}
