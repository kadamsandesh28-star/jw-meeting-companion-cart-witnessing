export interface NotebookSection {
  id: string;

  title: string;

  content: string;
}

export interface NotebookContent {
  notebookId: string;

  sections: NotebookSection[];

  createdAt: string;

  updatedAt: string;
}

export const createNotebookContent = (
  notebookId: string,
  sectionTitles: string[]
): NotebookContent => ({
  notebookId,

  sections: sectionTitles.map((title, index) => ({
    id: `${index + 1}`,
    title,
    content: "",
  })),

  createdAt: new Date().toISOString(),

  updatedAt: new Date().toISOString(),
});