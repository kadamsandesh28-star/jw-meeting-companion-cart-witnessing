import { BibleStudy, BibleStudyStatistics } from "../types/bibleStudy";

const STORAGE_KEY = "jw-bible-studies";

function loadBibleStudies(): BibleStudy[] {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return [];
  }

  try {
    return JSON.parse(data) as BibleStudy[];
  } catch {
    return [];
  }
}

function saveBibleStudies(studies: BibleStudy[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(studies));
}

export function getBibleStudies(): BibleStudy[] {
  return loadBibleStudies().sort(
    (a, b) =>
      new Date(a.nextStudyDate).getTime() -
      new Date(b.nextStudyDate).getTime()
  );
}

export function getBibleStudy(id: string): BibleStudy | undefined {
  return loadBibleStudies().find((study) => study.id === id);
}

export function addBibleStudy(
  study: Omit<BibleStudy, "id" | "createdAt" | "updatedAt">
): BibleStudy {
  const studies = loadBibleStudies();

  const newStudy: BibleStudy = {
    ...study,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  studies.push(newStudy);
  saveBibleStudies(studies);

  return newStudy;
}

export function updateBibleStudy(study: BibleStudy): void {
  const studies = loadBibleStudies();

  const index = studies.findIndex((s) => s.id === study.id);

  if (index === -1) return;

  studies[index] = {
    ...study,
    updatedAt: new Date().toISOString(),
  };

  saveBibleStudies(studies);
}

export function deleteBibleStudy(id: string): void {
  const studies = loadBibleStudies().filter((study) => study.id !== id);

  saveBibleStudies(studies);
}

export function searchBibleStudies(search: string): BibleStudy[] {
  const term = search.trim().toLowerCase();

  if (!term) {
    return getBibleStudies();
  }

  return getBibleStudies().filter((study) => {
    return (
      study.studentName.toLowerCase().includes(term) ||
      study.address.toLowerCase().includes(term) ||
      study.publication.toLowerCase().includes(term) ||
      study.notes.toLowerCase().includes(term)
    );
  });
}

export function getBibleStudyStatistics(): BibleStudyStatistics {
  const studies = loadBibleStudies();

  return {
    total: studies.length,
    active: studies.filter((s) => s.status === "Active").length,
    inactive: studies.filter((s) => s.status === "Inactive").length,
    completed: studies.filter((s) => s.status === "Completed").length,
  };
}