import { useState } from "react";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

import CreateStudyDialog from "../dialogs/CreateStudyDialog";
import TemplateDialog from "../dialogs/TemplateDialog";
import { useStudies } from "../hooks/useStudies";
import { StudyTemplate } from "../models/StudyTemplate";
import RecentStudies from "./RecentStudies";
import StudyHero from "./StudyHero";
import StudyStats from "./StudyStats";

export default function StudyDashboard() {
  const navigate = useNavigate();

  const {
    studies,
    createStudy,
    deleteStudy,
    toggleFavorite,
  } = useStudies();

  const [templateOpen, setTemplateOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const [selectedTemplate, setSelectedTemplate] =
    useState<StudyTemplate | null>(null);

  const handleTemplateSelected = (
    template: StudyTemplate
  ) => {
    setSelectedTemplate(template);
    setTemplateOpen(false);
    setCreateOpen(true);
  };

  const handleCreateStudy = (
    title: string,
    description: string
  ) => {
    if (!selectedTemplate) return;

    const study = createStudy(
      title,
      selectedTemplate.type,
      description
    );

    setCreateOpen(false);
    setSelectedTemplate(null);

    navigate(`/personal/personal-study/${study.id}`);
  };

  return (
    <>
      <Stack spacing={4}>
        <StudyHero totalStudies={studies.length} />

        <Button
          variant="contained"
          size="large"
          startIcon={<AddRoundedIcon />}
          onClick={() => setTemplateOpen(true)}
          sx={{
            alignSelf: "flex-start",
            borderRadius: 3,
            px: 3,
          }}
        >
          New Study
        </Button>

        <StudyStats studies={studies} />

        <RecentStudies
          studies={studies}
          onToggleFavorite={toggleFavorite}
          onDeleteStudy={deleteStudy}
        />
      </Stack>

      <TemplateDialog
        open={templateOpen}
        onClose={() => setTemplateOpen(false)}
        onSelect={handleTemplateSelected}
      />

      <CreateStudyDialog
        open={createOpen}
        template={selectedTemplate}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreateStudy}
      />
    </>
  );
}