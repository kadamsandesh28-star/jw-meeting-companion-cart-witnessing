import {
  Content,
  TableCell,
} from "pdfmake/interfaces";

import { PdfColors } from "./PdfColors";

export interface PdfSessionOverviewRow {
  label: string;
  value: string;
}

export interface PdfSessionOverviewOptions {
  title?: string;
  rows: PdfSessionOverviewRow[];
}

/**
 * Premium session overview card.
 */
export function createPdfSessionOverview(
  options: PdfSessionOverviewOptions
): Content {
  const heading =
    options.title ?? "Session Overview";

  return {
    table: {
      widths: ["*"],

      body: [
        [
          {
            stack: [
              {
                text: heading,
                fontSize: 18,
                bold: true,
                color: PdfColors.primary,
                margin: [0, 0, 0, 16],
              },

              ...options.rows.map(
                (row) => ({
                  columns: [
                    {
                      width: 120,
                      text: row.label,
                      bold: true,
                      color:
                        PdfColors.textSecondary,
                    },

                    {
                      text:
                        row.value || "—",
                      color:
                        PdfColors.textPrimary,
                    },
                  ],
                  margin: [0, 0, 0, 10],
                })
              ),
            ],

            fillColor:
              PdfColors.surface,

            margin: 18,

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
        PdfColors.primaryLight,

      hLineWidth: () => 0,

      vLineWidth: () => 0,

      paddingLeft: () => 0,

      paddingRight: () => 0,

      paddingTop: () => 0,

      paddingBottom: () => 0,
    },

    margin: [0, 0, 0, 24],
  };
}