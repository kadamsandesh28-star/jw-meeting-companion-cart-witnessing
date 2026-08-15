import { ReadingEntry } from "../types/bible";
import { createReadingPlan } from "./generators/readingPlanGenerator";
import { oneYearRanges } from "./plans/oneYear/ranges";

export const bibleInOneYear: ReadingEntry[] =
  createReadingPlan(oneYearRanges);