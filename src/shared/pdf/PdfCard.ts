import {
  Content,
  TableCell,
} from "pdfmake/interfaces";

import { PdfColors } from "./PdfColors";
import { PdfTheme } from "./PdfTheme";

export interface PdfCardOptions {
  title?: string;

  content: Content | Content[];

  accentColor?: string;

  margin?: [
    number,
    number,
    number,
    number
  ];
}

/**
 * Premium card used by all
 * JW Meeting Companion PDFs.
 */
export function createPdfCard(
  options: PdfCardOptions
): Content {
  const {
    title,
    content,
    accentColor = PdfColors.primary,
    margin = [0, 0, 0, 22],
  } = options;

  const body: Content[] = [];

  if (title) {
    body.push({
      table: {
        widths: [5, "*"],

        body: [
          [
            {
              text: "",
              fillColor: accentColor,
              border: [
                false,
                false,
                false,
                false,
              ],
            },

            {
              text: title,

              bold: true,

              fontSize: 17,

              color: PdfColors.primary,

              margin: [
                14,
                12,
                0,
                12,
              ],

              border: [
                false,
                false,
                false,
                false,
              ],
            },
          ],
        ],
      },

      layout: "noBorders",

      margin: [0, 0, 0, 14],
    });
  }

  body.push(
    ...(Array.isArray(content)
      ? content
      : [content])
  );

  return {
    // Prevent the card from splitting across pages
    unbreakable: true,

    table: {
      widths: ["*"],

      body: [
        [
          {
            stack: body,

            fillColor:
              PdfColors.surface,

            margin: [
              PdfTheme.card.padding,
              PdfTheme.card.padding,
              PdfTheme.card.padding,
              PdfTheme.card.padding,
            ],

            border: [
              false,
              false,
              false,
              false,
            ],
          } as TableCell,
        ],
      ],
    },

    layout: {
      fillColor: () =>
        PdfColors.surface,

      hLineWidth: () => 1,

      vLineWidth: () => 1,

      hLineColor: () =>
        PdfColors.border,

      vLineColor: () =>
        PdfColors.border,

      paddingLeft: () => 0,

      paddingRight: () => 0,

      paddingTop: () => 0,

      paddingBottom: () => 0,
    },

    margin,
  };
}