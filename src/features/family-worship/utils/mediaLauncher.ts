/**
 * Opens media using the most appropriate handler.
 *
 * Supports:
 * - JW Library links
 * - jw.org links
 * - YouTube
 * - PDF
 * - Generic websites
 */
export function launchMedia(
  url: string
): void {
  if (!url) {
    return;
  }

  const trimmed = url.trim();

  // JW Library deep links
  if (
    trimmed.startsWith(
      "jwlibrary://"
    )
  ) {
    window.location.href = trimmed;
    return;
  }

  // Everything else
  window.open(
    trimmed,
    "_blank",
    "noopener,noreferrer"
  );
}

/**
 * Opens the URL in the browser.
 */
export function openInBrowser(
  url: string
): void {
  if (!url) {
    return;
  }

  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );
}

/**
 * Returns true if this is a JW Library deep link.
 */
export function isJWLibraryLink(
  url: string
): boolean {
  return url
    .trim()
    .startsWith("jwlibrary://");
}

/**
 * Returns true if this points to jw.org.
 */
export function isJWOrgLink(
  url: string
): boolean {
  try {
    const parsed = new URL(url);

    return parsed.hostname.endsWith(
      "jw.org"
    );
  } catch {
    return false;
  }
}