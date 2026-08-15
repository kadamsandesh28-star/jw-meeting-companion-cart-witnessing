import { Notebook, NotebookType } from "../models/Notebook";

const STORAGE_KEY = "jw-notebooks";

const generateId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return (
    Date.now().toString(36) +
    Math.random().toString(36).substring(2, 9)
  );
};

const getAll = (): Notebook[] => {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) return [];

  try {
    return JSON.parse(raw) as Notebook[];
  } catch {
    return [];
  }
};

const saveAll = (items: Notebook[]) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(items)
  );
};

export const notebookService = {
  getAll,

  create(
    title: string,
    type: NotebookType,
    description = ""
  ): Notebook {
    const notebook: Notebook = {
      id: generateId(),
      title,
      type,
      description,

      favorite: false,
      archived: false,
      pinned: false,

      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [notebook, ...getAll()];

    saveAll(updated);

    return notebook;
  },

  update(notebook: Notebook) {
    const updated = getAll().map((item) =>
      item.id === notebook.id
        ? {
            ...notebook,
            updatedAt: new Date().toISOString(),
          }
        : item
    );

    saveAll(updated);

    return updated;
  },

  delete(id: string) {
    const updated = getAll().filter(
      (item) => item.id !== id
    );

    saveAll(updated);

    return updated;
  },

  toggleFavorite(id: string) {
    const updated = getAll().map((item) =>
      item.id === id
        ? {
            ...item,
            favorite: !item.favorite,
            updatedAt: new Date().toISOString(),
          }
        : item
    );

    saveAll(updated);

    return updated;
  },

  togglePinned(id: string) {
    const updated = getAll().map((item) =>
      item.id === id
        ? {
            ...item,
            pinned: !item.pinned,
            updatedAt: new Date().toISOString(),
          }
        : item
    );

    saveAll(updated);

    return updated;
  },

  archive(id: string) {
    const updated = getAll().map((item) =>
      item.id === id
        ? {
            ...item,
            archived: true,
            updatedAt: new Date().toISOString(),
          }
        : item
    );

    saveAll(updated);

    return updated;
  },
};