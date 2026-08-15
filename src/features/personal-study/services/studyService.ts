import { deleteNotebook } from "./notebookService";
import { Study, StudyType } from "../models/Study";

const STORAGE_KEY = "personal-studies";

const generateId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return (
    Date.now().toString(36) +
    Math.random().toString(36).substring(2, 9)
  );
};

const getAll = (): Study[] => {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as Study[];
  } catch {
    return [];
  }
};

const saveAll = (studies: Study[]) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(studies)
  );
};

export const studyService = {
  getAll,

  create(
    title: string,
    type: StudyType,
    description = ""
  ) {
    const studies = getAll();

    const study: Study = {
      id: generateId(),
      title,
      type,
      description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      favorite: false,
      archived: false,
    };

    const updated = [study, ...studies];

    saveAll(updated);

    return updated;
  },

  /**
   * Creates a study and returns the newly created Study.
   * This does NOT affect the existing create() method that
   * useStudies depends on.
   */
  createAndReturn(
    title: string,
    type: StudyType,
    description = ""
  ): Study {
    const studies = getAll();

    const study: Study = {
      id: generateId(),
      title,
      type,
      description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      favorite: false,
      archived: false,
    };

    saveAll([study, ...studies]);

    return study;
  },

  update(study: Study) {
    const updated = getAll().map((item) =>
      item.id === study.id
        ? {
            ...study,
            updatedAt: new Date().toISOString(),
          }
        : item
    );

    saveAll(updated);

    return updated;
  },

  delete(id: string) {
    // Remove the notebook associated with this study
    deleteNotebook(id);

    // Remove the study
    const updated = getAll().filter(
      (study) => study.id !== id
    );

    saveAll(updated);

    return updated;
  },

  toggleFavorite(id: string) {
    const updated = getAll().map((study) =>
      study.id === id
        ? {
            ...study,
            favorite: !study.favorite,
            updatedAt: new Date().toISOString(),
          }
        : study
    );

    saveAll(updated);

    return updated;
  },

  archive(id: string) {
    const updated = getAll().map((study) =>
      study.id === id
        ? {
            ...study,
            archived: true,
            updatedAt: new Date().toISOString(),
          }
        : study
    );

    saveAll(updated);

    return updated;
  },
};