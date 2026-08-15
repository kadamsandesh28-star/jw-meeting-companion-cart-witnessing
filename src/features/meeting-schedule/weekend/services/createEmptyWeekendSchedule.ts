import {
  WeekendMeetingSchedule,
  WeekendMeetingWeek,
} from "../models/WeekendMeetingSchedule";

function createWeek(
  weekNumber: number
): WeekendMeetingWeek {
  return {
    id: crypto.randomUUID(),

    weekNumber,

    meetingDate: "",

    chairman: "",

    openingSong: "",

    openingPrayer: "",

    publicTalkTheme: "",

    publicTalkSpeaker: "",

    middleSong: "",

    watchtowerReader: "",

    watchtowerConductor: "",

    closingSong: "",

    closingPrayer: "",
  };
}

export function createEmptyWeekendSchedule(
  month: string
): WeekendMeetingSchedule {
  const now = Date.now();

  return {
    id: crypto.randomUUID(),

    title: `Weekend Meeting - ${month}`,

    month,

    weeks: [
      createWeek(1),
      createWeek(2),
      createWeek(3),
      createWeek(4),
      createWeek(5),
    ],

    createdAt: now,

    updatedAt: now,
  };
}