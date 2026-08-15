import { FamilyWorshipSession } from "../models/FamilyWorshipSession";
import { createFamilyWorshipPdf } from "./familyWorshipPdfFactory";

export function printFamilyWorship(
  session: FamilyWorshipSession
) {
  createFamilyWorshipPdf(
    session
  ).print();
}