import fs from "node:fs";
import path from "node:path";

import { ReadingEntry } from "../../src/types/bible";

export function writeReadingPlan(
  variableName: string,
  readings: ReadingEntry[],
  outputFile: string
): void {
  const fileContents = `import { ReadingEntry } from "../../../types/bible";

export const ${variableName}: ReadingEntry[] = ${JSON.stringify(
    readings,
    null,
    2
  )};
`;

  fs.mkdirSync(path.dirname(outputFile), { recursive: true });

  fs.writeFileSync(outputFile, fileContents, "utf8");

  console.log(`✅ Wrote ${outputFile}`);
}