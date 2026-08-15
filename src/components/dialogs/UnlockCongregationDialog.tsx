import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  LockOutlined,
} from "@mui/icons-material";

interface UnlockCongregationDialogProps {
  open: boolean;
  onClose: () => void;
  onUnlock: () => void;
}

// Temporary password (we'll move this to a config file later)
const CONGREGATION_PASSWORD = "kingdom";

export default function UnlockCongregationDialog({
  open,
  onClose,
  onUnlock,
}: UnlockCongregationDialogProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleUnlock = () => {
    if (password === CONGREGATION_PASSWORD) {
      setPassword("");
      setShowPassword(false);
      setError("");
      onUnlock();
      return;
    }

    setError("Incorrect congregation password.");
  };

  const handleClose = () => {
    setPassword("");
    setShowPassword(false);
    setError("");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          color: "text.primary",
        }}
      >
        <LockOutlined color="primary" />
        Unlock Congregation Workspace
      </DialogTitle>

      <DialogContent>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            mb: 2,
            mt: 1,
          }}
        >
          Enter the congregation password to continue.
        </Typography>

        <TextField
          autoFocus
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          error={!!error}
          helperText={error}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleUnlock();
            }
          }}
          InputLabelProps={{
            sx: {
              color: "text.primary",
            },
          }}
          InputProps={{
            sx: {
              color: "text.primary",
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleUnlock}
        >
          Unlock
        </Button>
      </DialogActions>
    </Dialog>
  );
}