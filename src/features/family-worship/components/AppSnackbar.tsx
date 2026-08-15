import {
  Alert,
  Snackbar,
} from "@mui/material";

interface Props {
  open: boolean;
  message: string;
  severity?: "success" | "info" | "warning" | "error";
  onClose: () => void;
}

export default function AppSnackbar({
  open,
  message,
  severity = "success",
  onClose,
}: Props) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <Alert
        severity={severity}
        variant="filled"
        onClose={onClose}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}