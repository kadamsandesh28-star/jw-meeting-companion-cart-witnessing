import { BibleReadingPlan } from "../../../types/readingPlan";
import { DailyReadingDefinition } from "../../bible/types";

import { oneYearPlan } from "../oneYear/metadata";
import { oneYearSchedule } from "../../bible/schedule";

export interface RegisteredReadingPlan {
  plan: BibleReadingPlan;
  schedule: DailyReadingDefinition[];
}

export const readingPlanRegistry: RegisteredReadingPlan[] = [
  {
    plan: oneYearPlan,
    schedule: oneYearSchedule,
  },
];