import { StyleDictionary } from "pdfmake/interfaces";

import { PdfColors } from "./PdfColors";

/**
 * JW Meeting Companion
 * Premium PDF Typography
 */

export const PdfTypography: StyleDictionary = {
  coverTitle: {
    fontSize: 30,
    bold: true,
    color: PdfColors.surface,
    alignment: "center",
    margin: [0, 8, 0, 12],
  },

  coverSubtitle: {
    fontSize: 17,
    bold: true,
    color: PdfColors.surface,
    alignment: "center",
    margin: [0, 0, 0, 22],
  },

  heading: {
    fontSize: 24,
    bold: true,
    color: PdfColors.textPrimary,
    margin: [0, 0, 0, 14],
  },

  sectionTitle: {
    fontSize: 17,
    bold: true,
    color: PdfColors.primary,
    margin: [0, 0, 0, 14],
  },

  subHeading: {
    fontSize: 14,
    bold: true,
    color: PdfColors.textPrimary,
    margin: [0, 10, 0, 8],
  },

  body: {
    fontSize: 12,
    color: PdfColors.textPrimary,
    lineHeight: 1.6,
  },

  bodyMuted: {
    fontSize: 11,
    color: PdfColors.textSecondary,
    lineHeight: 1.6,
  },

  caption: {
    fontSize: 10,
    color: PdfColors.textSecondary,
  },

  footer: {
    fontSize: 9,
    color: PdfColors.footer,
    alignment: "center",
  },

  badge: {
    fontSize: 11,
    bold: true,
    color: PdfColors.surface,
  },
};