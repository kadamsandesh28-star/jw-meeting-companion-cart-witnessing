import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  useCongregationSettings,
} from "../hooks/useCongregationSettings";

export default function CongregationSettingsPage() {
  const {
    settings,
    save,
  } = useCongregationSettings();

  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        py: 5,
        px: 3,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 4,
        }}
      >
        <Stack spacing={3}>
          <Typography
            variant="h4"
            fontWeight={800}
          >
            Congregation Settings
          </Typography>

          <Typography color="text.secondary">
            Configure congregation information used
            throughout the application.
          </Typography>

          <TextField
            label="Congregation Name"
            value={settings.congregationName}
            onChange={(e) =>
              save({
                ...settings,
                congregationName:
                  e.target.value,
              })
            }
            fullWidth
          />

          <TextField
            label="Kingdom Hall"
            value={settings.kingdomHall}
            onChange={(e) =>
              save({
                ...settings,
                kingdomHall:
                  e.target.value,
              })
            }
            fullWidth
          />

          <TextField
            label="City / Location"
            placeholder="e.g. Vadodara"
            helperText="Used to show current weather on the Home page."
            value={settings.city}
            onChange={(e) =>
              save({
                ...settings,
                city: e.target.value,
              })
            }
            fullWidth
          />

          <TextField
            label="Circuit"
            value={settings.circuit}
            onChange={(e) =>
              save({
                ...settings,
                circuit: e.target.value,
              })
            }
            fullWidth
          />

          <TextField
            label="Language"
            value={settings.language}
            onChange={(e) =>
              save({
                ...settings,
                language: e.target.value,
              })
            }
            fullWidth
          />

          <TextField
            label="Dashboard Scripture"
            value={settings.scripture.text}
            onChange={(e) =>
              save({
                ...settings,
                scripture: {
                  ...settings.scripture,
                  text: e.target.value,
                },
              })
            }
            fullWidth
          />

          <TextField
            label="Scripture Reference"
            value={
              settings.scripture.reference
            }
            onChange={(e) =>
              save({
                ...settings,
                scripture: {
                  ...settings.scripture,
                  reference:
                    e.target.value,
                },
              })
            }
            fullWidth
          />

          <Button
            variant="contained"
            size="large"
          >
            Settings Saved
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}