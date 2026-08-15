import { Publisher } from "../types/Publisher";

/**
 * Returns the publisher's display name.
 * Falls back gracefully if either name is missing.
 */
export function getPublisherDisplayName(
  publisher: Publisher | null | undefined
): string {
  if (!publisher) {
    return "Unknown Publisher";
  }

  const firstName = publisher.firstName?.trim() ?? "";
  const lastName = publisher.lastName?.trim() ?? "";

  const fullName = `${firstName} ${lastName}`.trim();

  return fullName || "Unknown Publisher";
}