import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { passcodeService } from "../security/passcodeService";

interface CreatePasscodeProps {
  onSuccess?: () => void;
  onComplete?: () => void;
}

export default function CreatePasscode({
  onSuccess,
  onComplete,
}: CreatePasscodeProps) {
  const [passcode, setPasscode] = useState("");
  const [confirmPasscode, setConfirmPasscode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setError("");

    if (passcode.trim().length < 6) {
      setError("Passcode must contain at least 6 characters.");
      return;
    }

    if (passcode !== confirmPasscode) {
      setError("Passcodes do not match.");
      return;
    }

    try {
      setLoading(true);

      await passcodeService.create(passcode);

      onSuccess?.();
      onComplete?.();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unable to create secure workspace.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      p={2}
    >
      <Card sx={{ width: 420, maxWidth: "100%" }}>
        <CardContent>
          <Stack spacing={3}>
            <Typography variant="h5" align="center">
              Create Secure Elder Workspace
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
            >
              Create a passcode to protect confidential elder information.
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}

            <TextField
              label="Passcode"
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              fullWidth
            />

            <TextField
              label="Confirm Passcode"
              type="password"
              value={confirmPasscode}
              onChange={(e) => setConfirmPasscode(e.target.value)}
              fullWidth
            />

            <Button
              variant="contained"
              size="large"
              disabled={loading}
              onClick={handleCreate}
            >
              {loading
                ? "Creating..."
                : "Create Secure Workspace"}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}