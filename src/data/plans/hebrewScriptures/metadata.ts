import { createReadingPlan } from "../../generators/readingPlanGenerator";
import { hebrewScripturesRanges } from "./index";
import { BibleReadingPlan } from "../../../types/readingPlan";

export const hebrewScripturesPlan: BibleReadingPlan = {
  id: "hebrewScriptures",
  name: "Hebrew Scriptures",
  description: "Read the complete Hebrew Scriptures.",
  estimatedDays: 929,
  readings: createReadingPlan(hebrewScripturesRanges),
};