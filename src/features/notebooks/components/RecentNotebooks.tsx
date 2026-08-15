import { useState } from "react";

import {
  Stack,
  Typography,
} from "@mui/material";

import { useNotebooks } from "../hooks/useNotebooks";
import { Notebook } from "../models/Notebook";

import DeleteNotebookDialog from "./DeleteNotebookDialog";
import NotebookCard from "./NotebookCard";

interface Props {
  notebooks: Notebook[];
}

export default function RecentNotebooks({
  notebooks,
}: Props) {
  const {
    deleteNotebook,
    toggleFavorite,
    togglePinned,
  } = useNotebooks();

  const [
    notebookToDelete,
    setNotebookToDelete,
  ] =
    useState<Notebook | null>(
      null
    );

  return (
    <>
      <Stack spacing={2}>
        <Typography
          variant="h5"
          fontWeight={700}
        >
          Recent Notebooks
        </Typography>

        {notebooks.map(
          (notebook) => (
            <NotebookCard
              key={notebook.id}
              notebook={notebook}
              onFavorite={
                toggleFavorite
              }
              onPin={togglePinned}
              onDelete={() =>
                setNotebookToDelete(
                  notebook
                )
              }
            />
          )
        )}
      </Stack>

      <DeleteNotebookDialog
        open={Boolean(notebookToDelete)}
        notebook={notebookToDelete}
        onClose={() =>
          setNotebookToDelete(
            null
          )
        }
        onDelete={() => {
          if (!notebookToDelete)
            return;

          deleteNotebook(
            notebookToDelete.id
          );

          setNotebookToDelete(
            null
          );
        }}
      />
    </>
  );
}