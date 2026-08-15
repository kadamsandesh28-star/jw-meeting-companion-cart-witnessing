import {
  MidweekMeetingSchedule,
  MidweekMeetingWeek,
} from "../models/MidweekMeetingSchedule";

function createWeek(
  weekNumber: number
): MidweekMeetingWeek {
  return {
    id: crypto.randomUUID(),

    weekNumber,

    meetingDate: "",

    bibleReading: "",

    chairman: "",

    auxiliaryCounselor: "",

    openingSong: "",

    openingPrayer: "",

    openingComments: "",

    treasuresTalkTitle: "",

    treasuresTalkTime: "",

    treasuresTalkBrother: "",

    spiritualGemsTime: "",

    spiritualGemsBrother: "",

    bibleReadingTime: "",

    bibleReadingStudent: "",

    bibleReadingAssistant: "",

    applyAssignments: [
      {
        title: "",
        time: "",
        student: "",
        assistant: "",
      },
      {
        title: "",
        time: "",
        student: "",
        assistant: "",
      },
      {
        title: "",
        time: "",
        student: "",
        assistant: "",
      },
      {
        title: "",
        time: "",
        student: "",
        assistant: "",
      },
    ],

    middleSong: "",

    christianLifeParts: [
      {
        title: "",
        time: "",
        speaker: "",
      },
      {
        title: "",
        time: "",
        speaker: "",
      },
    ],

    congregationBibleStudyTime: "",

    congregationBibleStudyConductor: "",

    congregationBibleStudyReader: "",

    concludingComments: "",

    closingSong: "",

    closingPrayer: "",
  };
}

export function createEmptyMidweekSchedule(
  month: string
): MidweekMeetingSchedule {
  const now = Date.now();

  return {
    id: crypto.randomUUID(),

    title: `Midweek Meeting - ${month}`,

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