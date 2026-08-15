import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

import { FamilyWorshipSession } from "../models/FamilyWorshipSession";
import { familyWorshipFormatter } from "./familyWorshipFormatter";
import { familyWorshipPdfDefinition } from "./familyWorshipPdfDefinition";

let initialized = false;

function initializePdfMake() {
  if (initialized) {
    return;
  }

  const fonts =
    (pdfFonts as any).default ??
    pdfFonts;

  (pdfMake as any).vfs = fonts;

  initialized = true;
}

export function createFamilyWorshipPdf(
  session: FamilyWorshipSession
) {
  initializePdfMake();

  const exportData =
    familyWorshipFormatter(session);

  const definition =
    familyWorshipPdfDefinition(
      exportData
    );

  return pdfMake.createPdf(
    definition
  );
}