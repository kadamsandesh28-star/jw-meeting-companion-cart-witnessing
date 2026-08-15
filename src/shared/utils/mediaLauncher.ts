/**
 * Returns true if the URL is a JW Library deep link.
 */
export function isJWLibraryLink(
  url: string
): boolean {
  return url
    .trim()
    .toLowerCase()
    .startsWith("jwlibrary://");
}

/**
 * Returns true if the URL belongs to jw.org.
 */
export function isJWOrgLink(
  url: string
): boolean {
  try {
    return new URL(url)
      .hostname
      .endsWith("jw.org");
  } catch {
    return false;
  }
}

/**
 * Returns true if the URL is YouTube.
 */
export function isYouTubeLink(
  url: string
): boolean {
  try {
    const host = new URL(url)
      .hostname
      .toLowerCase();

    return (
      host.includes("youtube.com") ||
      host.includes("youtu.be")
    );
  } catch {
    return false;
  }
}

/**
 * Returns true if the URL points to a PDF.
 */
export function isPdfLink(
  url: string
): boolean {
  return url
    .toLowerCase()
    .includes(".pdf");
}

/**
 * Launches media using the most appropriate handler.
 */
export function launchMedia(
  url: string
): void {
  if (!url) {
    return;
  }

  const trimmed = url.trim();

  // JW Library deep link
  if (isJWLibraryLink(trimmed)) {
    window.location.href = trimmed;
    return;
  }

  // jw.org
  if (isJWOrgLink(trimmed)) {
    window.open(
      trimmed,
      "_blank",
      "noopener,noreferrer"
    );
    return;
  }

  // YouTube
  if (isYouTubeLink(trimmed)) {
    window.open(
      trimmed,
      "_blank",
      "noopener,noreferrer"
    );
    return;
  }

  // PDF
  if (isPdfLink(trimmed)) {
    window.open(
      trimmed,
      "_blank",
      "noopener,noreferrer"
    );
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
 * Always opens in the browser.
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