import { FamilyWorshipSession } from "../models/FamilyWorshipSession";
import { createFamilyWorshipPdf } from "./familyWorshipPdfFactory";

export function exportFamilyWorshipPdf(
  session: FamilyWorshipSession
) {
  const safeTitle = session.title
    .trim()
    .replace(/[\\/:*?"<>|]/g, "-");

  const fileName =
    safeTitle.length > 0
      ? `Family Worship - ${safeTitle}.pdf`
      : "Family Worship.pdf";

  createFamilyWorshipPdf(session)
    .download(fileName);
}