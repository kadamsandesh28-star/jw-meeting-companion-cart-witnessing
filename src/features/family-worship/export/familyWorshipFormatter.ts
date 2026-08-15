import { FamilyWorshipSession } from "../models/FamilyWorshipSession";
import { FamilyWorshipExport } from "./FamilyWorshipExport";

export function familyWorshipFormatter(
  session: FamilyWorshipSession
): FamilyWorshipExport {
  return {
    title: session.title,

    subtitle: session.theme,

    bibleReading:
      session.bibleReading,

    openingSong:
      session.openingSong,

    openingPrayer:
      session.openingPrayer,

    discussionQuestions: [
      ...session.discussionQuestions,
    ],

    notes: session.notes,

    goals: session.goals.map(
      (goal) => goal.title
    ),

    closingSong:
      session.closingSong,

    closingPrayer:
      session.closingPrayer,

    exportedAt: new Date(),
  };
}