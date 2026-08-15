import { Content } from "pdfmake/interfaces";

import {
  createPdfCard,
} from "./PdfCard";

/**
 * Creates a reusable PDF section.
 */
export function createPdfSection(
  title: string,
  content: Content | Content[]
): Content[] {
  return [
    createPdfCard({
      title,
      content,
    }),
  ];
}