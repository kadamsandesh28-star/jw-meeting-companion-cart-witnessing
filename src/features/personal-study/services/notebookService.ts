import {
  createEmptyNotebook,
  StudyNotebook,
} from "../models/StudyNotebook";

const STORAGE_KEY = "jw-meeting-companion-notebooks";

function getAll(): StudyNotebook[] {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) return [];

  try {
    return JSON.parse(raw) as StudyNotebook[];
  } catch {
    return [];
  }
}

function saveAll(notebooks: StudyNotebook[]) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(notebooks)
  );
}

export function getNotebook(
  studyId: string
): StudyNotebook {
  const notebooks = getAll();

  const existing = notebooks.find(
    (n) => n.studyId === studyId
  );

  if (existing) {
    return existing;
  }

  const notebook =
    createEmptyNotebook(studyId);

  notebooks.push(notebook);

  saveAll(notebooks);

  return notebook;
}

export function saveNotebook(
  notebook: StudyNotebook
) {
  const notebooks = getAll();

  const index = notebooks.findIndex(
    (n) => n.studyId === notebook.studyId
  );

  notebook.updatedAt =
    new Date().toISOString();

  if (index >= 0) {
    notebooks[index] = notebook;
  } else {
    notebooks.push(notebook);
  }

  saveAll(notebooks);
}

export function deleteNotebook(
  studyId: string
) {
  const notebooks = getAll().filter(
    (n) => n.studyId !== studyId
  );

  saveAll(notebooks);
}