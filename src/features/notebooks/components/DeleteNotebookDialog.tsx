import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { Notebook } from "../models/Notebook";

interface Props {
  open: boolean;
  notebook: Notebook | null;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteNotebookDialog({
  open,
  notebook,
  onClose,
  onDelete,
}: Props) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        Delete Notebook?
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete{" "}
          <strong>{notebook?.title}</strong>?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          color="error"
          variant="contained"
          onClick={onDelete}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}