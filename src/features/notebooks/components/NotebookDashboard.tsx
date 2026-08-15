import { useState } from "react";

import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

import CreateNotebookDialog from "../dialogs/CreateNotebookDialog";
import { useNotebooks } from "../hooks/useNotebooks";
import { NotebookTemplate } from "../models/NotebookTemplate";
import NotebookHero from "./NotebookHero";
import RecentNotebooks from "./RecentNotebooks";
import NotebookTemplateGrid from "./NotebookTemplateGrid";

export default function NotebookDashboard() {
  const navigate = useNavigate();

  const {
    notebooks,
    createNotebook,
  } = useNotebooks();

  const [
    selectedTemplate,
    setSelectedTemplate,
  ] =
    useState<NotebookTemplate | null>(
      null
    );

  const [dialogOpen, setDialogOpen] =
    useState(false);

  function handleTemplateSelect(
    template: NotebookTemplate
  ) {
    setSelectedTemplate(template);
    setDialogOpen(true);
  }

  function handleCreate(
    title: string,
    description: string
  ) {
    if (!selectedTemplate) return;

    const notebook =
      createNotebook(
        title,
        selectedTemplate.type,
        description
      );

    setDialogOpen(false);
    setSelectedTemplate(null);

    navigate(
      `/personal/notebooks/${notebook.id}`
    );
  }

  return (
    <>
      <Stack spacing={4}>
        <NotebookHero />

        <NotebookTemplateGrid
          onSelect={
            handleTemplateSelect
          }
        />

        <RecentNotebooks
          notebooks={notebooks}
        />
      </Stack>

      <CreateNotebookDialog
        open={dialogOpen}
        template={selectedTemplate}
        onClose={() =>
          setDialogOpen(false)
        }
        onCreate={handleCreate}
      />
    </>
  );
}