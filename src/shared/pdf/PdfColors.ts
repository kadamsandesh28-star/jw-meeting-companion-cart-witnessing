/**
 * JW Meeting Companion
 * Premium PDF Design System
 */

export const PdfColors = {
  /**
   * Brand Blue
   */
  primary: "#2563EB",

  /**
   * Dark Brand
   */
  primaryDark: "#1D4ED8",

  /**
   * Very soft blue used for cards.
   */
  primaryLight: "#EFF6FF",

  /**
   * Paper background.
   */
  paper: "#FAFBFC",

  /**
   * Card background.
   */
  surface: "#FFFFFF",

  /**
   * Success.
   */
  success: "#16A34A",

  /**
   * Warning.
   */
  warning: "#F59E0B",

  /**
   * Error.
   */
  error: "#DC2626",

  /**
   * Accent.
   */
  accent: "#3B82F6",

  /**
   * Borders.
   */
  border: "#D9E6F2",

  /**
   * Divider.
   */
  divider: "#E8EEF5",

  /**
   * Main Heading.
   */
  textPrimary: "#0F172A",

  /**
   * Secondary text.
   */
  textSecondary: "#475569",

  /**
   * Footer.
   */
  footer: "#94A3B8",

  /**
   * Links.
   */
  link: "#2563EB",
} as const;

export type PdfColor =
  (typeof PdfColors)[keyof typeof PdfColors];