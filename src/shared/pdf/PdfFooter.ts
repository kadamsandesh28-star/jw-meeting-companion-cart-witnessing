import {
  Content,
} from "pdfmake/interfaces";

import { PdfColors } from "./PdfColors";

/**
 * Creates a reusable footer.
 */
export function createPdfFooter(
  generatedAt: Date
): Content {
  return {
    margin: [0, 30, 0, 0],

    stack: [
      {
        canvas: [
          {
            type: "line",
            x1: 0,
            y1: 0,
            x2: 515,
            y2: 0,
            lineWidth: 1,
            lineColor:
              PdfColors.divider,
          },
        ],
        margin: [0, 0, 0, 8],
      },

      {
        columns: [
          {
            text:
              "JW Meeting Companion",
            color:
              PdfColors.footer,
            fontSize: 9,
          },

          {
            text:
              generatedAt.toLocaleString(),
            alignment: "right",
            color:
              PdfColors.footer,
            fontSize: 9,
          },
        ],
      },
    ],
  };
}