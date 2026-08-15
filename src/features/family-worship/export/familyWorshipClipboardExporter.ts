import { FamilyWorshipSession } from "../models/FamilyWorshipSession";
import { familyWorshipTextFormatter } from "./familyWorshipTextFormatter";

export async function copyFamilyWorship(
  session: FamilyWorshipSession
) {
  const text =
    familyWorshipTextFormatter(
      session
    );

  await navigator.clipboard.writeText(
    text
  );
}