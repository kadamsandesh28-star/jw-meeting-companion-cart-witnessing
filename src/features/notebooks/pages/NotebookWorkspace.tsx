import { useEffect, useState } from "react";

import {
  Box,
  CircularProgress,
} from "@mui/material";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import NotebookEditor from "../components/NotebookEditor";
import NotebookHeader from "../components/NotebookHeader";
import { Notebook } from "../models/Notebook";
import { NotebookContent } from "../models/NotebookContent";
import {
  getNotebookContent,
  saveNotebookContent,
} from "../services/notebookContentService";
import { notebookService } from "../services/notebookService";
import { getNotebookSections } from "../utils/notebookTemplates";

export default function NotebookWorkspace() {
  const { id } =
    useParams<{ id: string }>();

  const navigate = useNavigate();

  const [notebook, setNotebook] =
    useState<Notebook | null>(null);

  const [content, setContent] =
    useState<NotebookContent | null>(
      null
    );

  useEffect(() => {
    if (!id) return;

    const found = notebookService
      .getAll()
      .find((n) => n.id === id);

    if (!found) return;

    setNotebook(found);

    const sections =
      getNotebookSections(found.type);

    setContent(
      getNotebookContent(
        found.id,
        sections
      )
    );
  }, [id]);

  if (!notebook || !content) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        py={8}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <NotebookHeader
        notebook={notebook}
        onBack={() =>
          navigate("/personal/notebooks")
        }
      />

      <NotebookEditor
        notebook={content}
        onChange={(updated) => {
          setContent(updated);
          saveNotebookContent(updated);
        }}
      />
    </Box>
  );
}