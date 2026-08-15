import { useEffect, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";

import { NotebookTemplate } from "../models/NotebookTemplate";

interface CreateNotebookDialogProps {
  open: boolean;
  template: NotebookTemplate | null;
  onClose: () => void;
  onCreate: (
    title: string,
    description: string
  ) => void;
}

export default function CreateNotebookDialog({
  open,
  template,
  onClose,
  onCreate,
}: CreateNotebookDialogProps) {
  const [title, setTitle] = useState("");

  const [description, setDescription] =
    useState("");

  useEffect(() => {
    if (open) {
      setTitle("");
      setDescription("");
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {template?.icon} {template?.title}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField
            label="Notebook Name"
            fullWidth
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <TextField
            label="Description (optional)"
            multiline
            minRows={3}
            fullWidth
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          disabled={!title.trim()}
          onClick={() => {
            onCreate(
              title.trim(),
              description.trim()
            );
          }}
        >
          Create Notebook
        </Button>
      </DialogActions>
    </Dialog>
  );
}