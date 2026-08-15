import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface Props {
  open: boolean;
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteSessionDialog({
  open,
  title,
  onCancel,
  onConfirm,
}: Props) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
    >
      <DialogTitle>
        Delete Session?
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to
          permanently delete
          <strong>
            {" "}
            "{title}"
          </strong>
          ?
        </DialogContentText>

        <DialogContentText
          sx={{ mt: 2 }}
        >
          This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          color="error"
          variant="contained"
          onClick={onConfirm}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}