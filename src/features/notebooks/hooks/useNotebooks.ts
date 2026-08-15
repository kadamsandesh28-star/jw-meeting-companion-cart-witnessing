import { useEffect, useState } from "react";

import { Notebook, NotebookType } from "../models/Notebook";
import { notebookService } from "../services/notebookService";

export function useNotebooks() {
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);

  useEffect(() => {
    setNotebooks(notebookService.getAll());
  }, []);

  const createNotebook = (
    title: string,
    type: NotebookType,
    description = ""
  ): Notebook => {
    const notebook = notebookService.create(
      title,
      type,
      description
    );

    setNotebooks(notebookService.getAll());

    return notebook;
  };

  const updateNotebook = (notebook: Notebook) => {
    setNotebooks(
      notebookService.update(notebook)
    );
  };

  const deleteNotebook = (id: string) => {
    setNotebooks(
      notebookService.delete(id)
    );
  };

  const toggleFavorite = (id: string) => {
    setNotebooks(
      notebookService.toggleFavorite(id)
    );
  };

  const togglePinned = (id: string) => {
    setNotebooks(
      notebookService.togglePinned(id)
    );
  };

  const archiveNotebook = (id: string) => {
    setNotebooks(
      notebookService.archive(id)
    );
  };

  return {
    notebooks,

    createNotebook,

    updateNotebook,

    deleteNotebook,

    toggleFavorite,

    togglePinned,

    archiveNotebook,
  };
}