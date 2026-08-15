import { TDocumentDefinitions } from "pdfmake/interfaces";

import { createPdfCover } from "../../../shared/pdf/PdfCover";
import { createPdfFooter } from "../../../shared/pdf/PdfFooter";
import { createPdfSection } from "../../../shared/pdf/PdfSection";
import { createPdfSessionOverview } from "../../../shared/pdf/PdfSessionOverview";
import { PdfTheme } from "../../../shared/pdf/PdfTheme";
import { PdfTypography } from "../../../shared/pdf/PdfTypography";

import { FamilyWorshipExport } from "./FamilyWorshipExport";

export function familyWorshipPdfDefinition(
  data: FamilyWorshipExport
): TDocumentDefinitions {
  return {
    pageMargins: PdfTheme.page.margins,

    content: [
      createPdfCover({
        title: "FAMILY WORSHIP",
        description: "Faith • Family • Spiritual Growth",
      }),

      createPdfSessionOverview({
        rows: [
          {
            label: "Title",
            value: data.title,
          },
          {
            label: "Theme",
            value: data.subtitle,
          },
          {
            label: "Bible Reading",
            value: data.bibleReading,
          },
          {
            label: "Generated",
            value: data.exportedAt.toLocaleDateString(),
          },
        ],
      }),

      // Opening moved above Bible Reading
      ...createPdfSection(
        "🎵 Opening",
        [
          {
            columns: [
              {
                width: 100,
                text: "Song",
                bold: true,
              },
              {
                text: data.openingSong,
              },
            ],
            margin: [0, 0, 0, 8],
          },

          {
            columns: [
              {
                width: 100,
                text: "Prayer",
                bold: true,
              },
              {
                text: data.openingPrayer || "—",
              },
            ],
          },
        ]
      ),

      ...createPdfSection(
        "📖 Bible Reading",
        [
          {
            text: data.bibleReading,
            style: "heading",
            alignment: "center",
            margin: [0, 8, 0, 12],
          },

          {
            canvas: [
              {
                type: "line",
                x1: 0,
                y1: 0,
                x2: 430,
                y2: 0,
                lineWidth: 0.8,
                lineColor: "#D9E6F2",
              },
            ],
            margin: [0, 0, 0, 12],
          },

          {
            text:
              "Read this passage together before discussing the questions below.",
            style: "bodyMuted",
            alignment: "center",
          },
        ]
      ),

      ...createPdfSection(
        "💬 Discussion Questions",
        {
          ol: data.discussionQuestions,
          margin: [0, 6, 0, 0],
        }
      ),

      ...createPdfSection(
        "📝 Notes",
        {
          text:
            data.notes?.trim() ||
            "No notes recorded for this session.",
          style: "body",
        }
      ),

      ...createPdfSection(
        "🎯 Family Goals",
        {
          ul: data.goals,
        }
      ),

      ...createPdfSection(
        "🎵 Closing",
        [
          {
            columns: [
              {
                width: 100,
                text: "Song",
                bold: true,
              },
              {
                text: data.closingSong,
              },
            ],
            margin: [0, 0, 0, 8],
          },

          {
            columns: [
              {
                width: 100,
                text: "Prayer",
                bold: true,
              },
              {
                text: data.closingPrayer || "—",
              },
            ],
          },
        ]
      ),

      createPdfFooter(data.exportedAt),
    ],

    styles: PdfTypography,

    defaultStyle: {
      fontSize: 12,
    },
  };
}