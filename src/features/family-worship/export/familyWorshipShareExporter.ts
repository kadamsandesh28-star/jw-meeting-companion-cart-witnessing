import { FamilyWorshipSession } from "../models/FamilyWorshipSession";
import { familyWorshipTextFormatter } from "./familyWorshipTextFormatter";
import { copyFamilyWorship } from "./familyWorshipClipboardExporter";

export async function shareFamilyWorship(
  session: FamilyWorshipSession
) {
  const text =
    familyWorshipTextFormatter(
      session
    );

  if (navigator.share) {
    try {
      await navigator.share({
        title:
          session.title ||
          "Family Worship",
        text,
      });

      return;
    } catch {
      // User cancelled sharing
      return;
    }
  }

  await copyFamilyWorship(session);

  alert(
    "Sharing isn't supported on this device.\n\nThe worship session has been copied to your clipboard instead."
  );
}