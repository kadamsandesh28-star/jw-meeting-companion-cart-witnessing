import fs from "node:fs";

import { DailyReadingDefinition } from "../../src/data/bible/types";

export function writeSchedule(
  schedule: DailyReadingDefinition[],
  outputPath: string
): void {
  const file = `import { DailyReadingDefinition } from "./types";

export const oneYearSchedule: DailyReadingDefinition[] =
${JSON.stringify(schedule, null, 2)};
`;

  fs.writeFileSync(outputPath, file, "utf8");
}