import {
  createNotebookContent,
  NotebookContent,
} from "../models/NotebookContent";

const STORAGE_KEY = "jw-notebook-content";

function getAll(): NotebookContent[] {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) return [];

  try {
    return JSON.parse(raw) as NotebookContent[];
  } catch {
    return [];
  }
}

function saveAll(items: NotebookContent[]) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(items)
  );
}

export function getNotebookContent(
  notebookId: string,
  sections: string[]
): NotebookContent {
  const items = getAll();

  const existing = items.find(
    (n) => n.notebookId === notebookId
  );

  if (existing) {
    return existing;
  }

  const content = createNotebookContent(
    notebookId,
    sections
  );

  items.push(content);

  saveAll(items);

  return content;
}

export function saveNotebookContent(
  notebook: NotebookContent
) {
  const items = getAll();

  const index = items.findIndex(
    (n) => n.notebookId === notebook.notebookId
  );

  notebook.updatedAt = new Date().toISOString();

  if (index >= 0) {
    items[index] = notebook;
  } else {
    items.push(notebook);
  }

  saveAll(items);
}

export function deleteNotebookContent(
  notebookId: string
) {
  const items = getAll().filter(
    (n) => n.notebookId !== notebookId
  );

  saveAll(items);
}