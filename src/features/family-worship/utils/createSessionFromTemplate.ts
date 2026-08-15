import { FamilyWorshipSession } from "../models/FamilyWorshipSession";
import { WorshipTemplate } from "../models/WorshipTemplate";

export function createSessionFromTemplate(
  template: WorshipTemplate
): FamilyWorshipSession {
  const now = Date.now();

  // Today's date (YYYY-MM-DD)
  const today = new Date().toISOString().split("T")[0];

  return {
    id: crypto.randomUUID(),

    title: template.title,

    theme: template.theme,

    scheduledDate: today,

    scheduledTime: "19:00",

    category: "family-worship",

    bibleReading: template.bibleReading,

    openingSong: template.openingSong,

    openingPrayer: "",

    discussionQuestions: [
      ...template.discussionQuestions,
    ],

    media: [...template.suggestedMedia],

    notes: "",

    goals: template.defaultGoals.map(
      (goal) => ({
        id: crypto.randomUUID(),
        title: goal,
        completed: false,
      })
    ),

    closingSong: template.closingSong,

    closingPrayer: "",

    favorite: false,

    completed: false,

    createdAt: now,

    updatedAt: now,
  };
}