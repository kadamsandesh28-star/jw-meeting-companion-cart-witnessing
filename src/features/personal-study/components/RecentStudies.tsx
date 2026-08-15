import { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";

import { Study } from "../models/Study";
import StudyCard from "./StudyCard";

interface RecentStudiesProps {
  studies: Study[];
  onToggleFavorite?: (id: string) => void;
  onDeleteStudy?: (id: string) => void;
}

export default function RecentStudies({
  studies,
  onToggleFavorite,
  onDeleteStudy,
}: RecentStudiesProps) {
  const [studyToDelete, setStudyToDelete] =
    useState<Study | null>(null);

  const recentStudies = [...studies]
    .filter((study) => !study.archived)
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() -
        new Date(a.updatedAt).getTime()
    )
    .slice(0, 5);

  const handleDelete = () => {
    if (!studyToDelete) return;

    onDeleteStudy?.(studyToDelete.id);
    setStudyToDelete(null);
  };

  return (
    <>
      <Stack spacing={3}>
        <Typography variant="h5" fontWeight={700}>
          Recent Studies
        </Typography>

        {recentStudies.length === 0 ? (
          <Typography color="text.secondary">
            You haven't created any study projects yet.
          </Typography>
        ) : (
          <Stack spacing={2}>
            {recentStudies.map((study) => (
              <StudyCard
                key={study.id}
                study={study}
                onToggleFavorite={onToggleFavorite}
                onDelete={() => setStudyToDelete(study)}
              />
            ))}
          </Stack>
        )}
      </Stack>

      <Dialog
        open={Boolean(studyToDelete)}
        onClose={() => setStudyToDelete(null)}
      >
        <DialogTitle>
          Delete Study?
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to permanently delete{" "}
            <strong>{studyToDelete?.title}</strong>?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setStudyToDelete(null)}>
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}