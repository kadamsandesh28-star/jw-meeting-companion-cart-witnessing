import { useState } from "react";

import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

import {
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  loadCongregationProfile,
  saveCongregationProfile,
} from "../storage/congregationProfileStorage";

export default function Settings() {
  const [profile, setProfile] = useState(
    loadCongregationProfile()
  );

  function handleSave() {
    saveCongregationProfile(profile);

    alert(
      "Congregation profile saved successfully."
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        maxWidth: 700,
        mx: "auto",
        mt: 4,
        p: 4,
        borderRadius: 4,
        border: 1,
        borderColor: "divider",
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
          Configure your congregation information.
        </Typography>

        <TextField
          fullWidth
          label="Congregation Name"
          value={profile.congregationName}
          onChange={(e) =>
            setProfile({
              ...profile,
              congregationName:
                e.target.value,
            })
          }
        />

        <TextField
          fullWidth
          label="Kingdom Hall"
          value={profile.kingdomHall}
          onChange={(e) =>
            setProfile({
              ...profile,
              kingdomHall:
                e.target.value,
            })
          }
        />

        <TextField
          fullWidth
          label="City / Location"
          placeholder="e.g. Vadodara"
          helperText="Used to display current weather on the Home page."
          value={profile.city}
          onChange={(e) =>
            setProfile({
              ...profile,
              city: e.target.value,
            })
          }
        />

        <TextField
          fullWidth
          label="Circuit"
          value={profile.circuit}
          onChange={(e) =>
            setProfile({
              ...profile,
              circuit: e.target.value,
            })
          }
        />

        <TextField
          fullWidth
          label="Language"
          value={profile.language}
          onChange={(e) =>
            setProfile({
              ...profile,
              language: e.target.value,
            })
          }
        />

        <TextField
          fullWidth
          label="Dashboard Scripture"
          value={profile.scriptureText}
          onChange={(e) =>
            setProfile({
              ...profile,
              scriptureText:
                e.target.value,
            })
          }
        />

        <TextField
          fullWidth
          label="Scripture Reference"
          value={
            profile.scriptureReference
          }
          onChange={(e) =>
            setProfile({
              ...profile,
              scriptureReference:
                e.target.value,
            })
          }
        />

        <Button
          variant="contained"
          startIcon={
            <SaveRoundedIcon />
          }
          onClick={handleSave}
        >
          Save Settings
        </Button>
      </Stack>
    </Paper>
  );
}