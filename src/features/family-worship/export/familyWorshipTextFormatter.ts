import { FamilyWorshipSession } from "../models/FamilyWorshipSession";

export function familyWorshipTextFormatter(
  session: FamilyWorshipSession
): string {
  return `
📖 FAMILY WORSHIP

Title:
${session.title}

Theme:
${session.theme}

Bible Reading:
${session.bibleReading}

Opening Song:
${session.openingSong}

Opening Prayer:
${session.openingPrayer}

Discussion Questions:

${session.discussionQuestions
  .map((q) => `• ${q}`)
  .join("\n")}

Notes:

${session.notes}

Family Goals:

${session.goals
  .map((g) => `☐ ${g.title}`)
  .join("\n")}

Closing Song:
${session.closingSong}

Closing Prayer:
${session.closingPrayer}
`.trim();
}