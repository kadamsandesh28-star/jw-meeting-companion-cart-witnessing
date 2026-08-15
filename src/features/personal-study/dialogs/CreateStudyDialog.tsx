import { useEffect, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { StudyTemplate } from "../models/StudyTemplate";

interface CreateStudyDialogProps {
  open: boolean;
  template: StudyTemplate | null;
  onClose: () => void;
  onCreate: (
    title: string,
    description: string
  ) => void;
}

export default function CreateStudyDialog({
  open,
  template,
  onClose,
  onCreate,
}: CreateStudyDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  useEffect(() => {
    if (open && template) {
      setTitle("");
      setDescription("");
    }
  }, [open, template]);

  const handleCreate = () => {
    if (!title.trim()) return;

    onCreate(title.trim(), description.trim());
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {template?.icon} Create {template?.name}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <Typography color="text.secondary">
            Give your study a meaningful title.
          </Typography>

          <TextField
            label="Study Title"
            fullWidth
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            minRows={3}
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          disabled={!title.trim()}
          onClick={handleCreate}
        >
          Create Study
        </Button>
      </DialogActions>
    </Dialog>
  );
}