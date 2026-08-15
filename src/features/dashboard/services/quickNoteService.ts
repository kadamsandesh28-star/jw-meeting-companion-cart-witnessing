import { QuickNote } from "../models/QuickNote";

const STORAGE_KEY = "dashboard-quick-note";

const generateId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return (
    Date.now().toString(36) +
    Math.random().toString(36).substring(2, 9)
  );
};

export const quickNoteService = {
  get(): QuickNote {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return {
        id: generateId(),
        content: "",
        updatedAt: new Date().toISOString(),
      };
    }

    try {
      return JSON.parse(raw) as QuickNote;
    } catch {
      return {
        id: generateId(),
        content: "",
        updatedAt: new Date().toISOString(),
      };
    }
  },

  save(content: string): QuickNote {
    const note: QuickNote = {
      id: generateId(),
      content,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(note)
    );

    return note;
  },

  clear() {
    localStorage.removeItem(STORAGE_KEY);
  },
};