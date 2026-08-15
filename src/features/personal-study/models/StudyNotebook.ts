export interface StudyNotebook {
  studyId: string;

  objective: string;

  questions: string;

  research: string;

  application: string;

  prayer: string;

  notes: string;

  attachments: string[];

  createdAt: string;

  updatedAt: string;
}

export const createEmptyNotebook = (
  studyId: string
): StudyNotebook => ({
  studyId,

  objective: "",
  questions: "",
  research: "",
  application: "",
  prayer: "",
  notes: "",

  attachments: [],

  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});