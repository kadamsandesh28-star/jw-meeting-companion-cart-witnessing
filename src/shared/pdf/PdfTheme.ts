/**
 * JW Meeting Companion
 * Premium PDF Theme
 */

export const PdfTheme = {
  page: {
    size: "A4",
    orientation: "portrait",

    // Slightly wider content area
    margins: [34, 42, 34, 42] as [
      number,
      number,
      number,
      number
    ],
  },

  spacing: {
    xs: 6,
    sm: 10,
    md: 18,
    lg: 28,
    xl: 40,
    xxl: 56,
  },

  /**
   * Used by cards.
   */
  borderRadius: 12,

  card: {
    padding: 18,
  },

  section: {
    marginTop: 24,
    marginBottom: 18,
  },

  cover: {
    bannerHeight: 140,
    titleSpacing: 30,
  },

  header: {
    height: 70,
  },

  footer: {
    height: 48,
  },
} as const;