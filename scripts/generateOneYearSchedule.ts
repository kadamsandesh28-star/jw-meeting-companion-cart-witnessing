import path from "node:path";

import { expandBible } from "./schedule/expandBible";
import { balanceDays } from "./schedule/balanceDays";
import { mergePassages } from "./schedule/mergePassages";
import { validateSchedule } from "./schedule/scheduleValidator";
import { verifyCoverage } from "./schedule/verifyCoverage";
import { reportSchedule } from "./schedule/reportSchedule";
import { writeSchedule } from "./schedule/writeSchedule";

const TOTAL_DAYS = 365;

console.log("");
console.log("📖 Generating One-Year Bible Schedule");
console.log("====================================");
console.log("");

console.log("📚 Step 1: Expanding Bible...");
const chapters = expandBible();
console.log(`✅ ${chapters.length} chapters expanded`);

console.log("");
console.log(`⚖️ Step 2: Balancing chapters across ${TOTAL_DAYS} days...`);
const balancedDays = balanceDays(chapters, TOTAL_DAYS);
console.log(`✅ ${balancedDays.length} balanced days created`);

console.log("");
console.log("🔗 Step 3: Merging consecutive chapters...");
const schedule = mergePassages(balancedDays);
console.log(`✅ ${schedule.length} schedule entries created`);

console.log("");
console.log("🧪 Step 4: Validating schedule...");
validateSchedule(schedule);

console.log("");
console.log("🔍 Step 5: Verifying chapter coverage...");
verifyCoverage(schedule);

console.log("");
console.log("📊 Step 6: Reporting statistics...");
reportSchedule(schedule);

const outputPath = path.join(
  process.cwd(),
  "src",
  "data",
  "bible",
  "schedule.ts"
);

console.log("");
console.log("💾 Step 7: Writing schedule...");
writeSchedule(schedule, outputPath);

console.log("");
console.log("====================================");
console.log("🎉 Schedule generation complete!");
console.log(`📄 Output: ${outputPath}`);
console.log(`📅 Days: ${schedule.length}`);
console.log(`📖 Chapters: ${chapters.length}`);
console.log("====================================");
console.log("");