import path from "node:path";

import { createReadingPlan } from "../src/data/generators/readingPlanGenerator";
import { oneYearSchedule } from "../src/data/bible/schedule";
import { oneYearPlan } from "../src/data/plans/oneYear/metadata";
import { validateReadingPlan } from "./validateReadingPlan";
import { writeReadingPlan } from "./writers/writeReadingPlan";

console.log("");
console.log("📖 Building Reading Plans");
console.log("=========================");
console.log("");

validateReadingPlan(oneYearSchedule);

const readings = createReadingPlan(oneYearSchedule);

console.log(`Generating: ${oneYearPlan.name}`);
console.log(`Readings : ${readings.length}`);

writeReadingPlan(
  `${oneYearPlan.id}Readings`,
  readings,
  path.join(
    process.cwd(),
    "src",
    "data",
    "plans",
    "generated",
    `${oneYearPlan.id}.ts`
  )
);

console.log("");
console.log("✅ Build complete");