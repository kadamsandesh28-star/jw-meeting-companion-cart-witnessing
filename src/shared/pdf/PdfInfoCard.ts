import {
  Content,
  TableCell,
} from "pdfmake/interfaces";

import { PdfColors } from "./PdfColors";

export interface PdfInfoCardOptions {
  title: string;
  rows: {
    label: string;
    value: string;
  }[];
}

/**
 * Creates an information card displayed
 * below the document cover.
 */
export function createPdfInfoCard(
  options: PdfInfoCardOptions
): Content {
  return {
    table: {
      widths: ["*"],
      body: [
        [
          {
            stack: [
              {
                text: options.title,
                fontSize: 18,
                bold: true,
                color: PdfColors.primary,
                margin: [0, 0, 0, 12],
              },

              ...options.rows.map(
                (row) => ({
                  columns: [
                    {
                      text: row.label,
                      bold: true,
                      width: 120,
                    },
                    {
                      text:
                        row.value || "—",
                    },
                  ],
                  margin: [0, 0, 0, 8],
                })
              ),
            ],

            margin: 18,

            border: [
              false,
              false,
              false,
              false,
            ],

            fillColor:
              PdfColors.surface,
          } as TableCell,
        ],
      ],
    },

    layout: {
      fillColor: () =>
        PdfColors.primaryLight,

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

    margin: [0, 0, 0, 24],
  };
}