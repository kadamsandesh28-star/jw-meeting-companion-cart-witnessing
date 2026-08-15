/**
 * JW Meeting Companion
 * Central place for opening JW.org resources.
 *
 * Future enhancements:
 * - Support jwlibrary:// deep links
 * - Browser / JW Library App preference
 * - Videos, songs, articles, etc.
 */

const STORAGE_KEY = "jwMeetingCompanion.resources";

const FINDER_BASE =
  "https://www.jw.org/finder?srcid=jwlshare&wtlocale=E";

interface ResourceSettings {
  workbookTitle?: string;
  workbookUrl?: string;
  watchtowerTitle?: string;
  watchtowerUrl?: string;
}

function getSettings(): ResourceSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) return {};

    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function openUrl(url: string) {
  if (!url) return;

  window.open(url, "_blank", "noopener,noreferrer");
}

export function openBible(reference: string) {
  if (!reference) return;

  // For now we search JW.org.
  // Later we'll replace this with direct deep-link support.
  openUrl(`${FINDER_BASE}&q=${encodeURIComponent(reference)}`);
}

export function openWorkbook() {
  const settings = getSettings();

  if (settings.workbookUrl) {
    openUrl(settings.workbookUrl);
    return;
  }

  alert(
    "No Midweek Workbook has been configured.\n\nGo to Settings and paste the current Workbook URL."
  );
}

export function openWatchtower() {
  const settings = getSettings();

  if (settings.watchtowerUrl) {
    openUrl(settings.watchtowerUrl);
    return;
  }

  alert(
    "No Watchtower Study has been configured.\n\nGo to Settings and paste the current Watchtower Study URL."
  );
}

export function openPublication(reference?: string) {
  const text = (reference ?? "").toLowerCase();

  if (
    text.includes("watchtower") ||
    text.includes("wt")
  ) {
    openWatchtower();
    return;
  }

  // Default to Workbook
  openWorkbook();
}