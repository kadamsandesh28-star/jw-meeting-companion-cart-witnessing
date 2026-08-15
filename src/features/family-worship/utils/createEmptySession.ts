import { FamilyWorshipSession } from "../models/FamilyWorshipSession";

export function createEmptySession(): FamilyWorshipSession {
  const now = Date.now();

  // Today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  return {
    id: crypto.randomUUID(),

    title: "",

    theme: "",

    scheduledDate: today,

    scheduledTime: "19:00",

    category: "family-worship",

    bibleReading: "",

    openingSong: "",

    openingPrayer: "",

    discussionQuestions: [""],

    media: [],

    notes: "",

    goals: [
      {
        id: crypto.randomUUID(),
        title: "",
        completed: false,
      },
    ],

    closingSong: "",

    closingPrayer: "",

    favorite: false,

    completed: false,

    createdAt: now,

    updatedAt: now,
  };
}