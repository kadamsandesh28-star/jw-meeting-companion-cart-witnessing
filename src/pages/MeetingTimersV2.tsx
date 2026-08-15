import { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";

import TimerTabs from "../components/TimerTabs";

export default function MeetingTimersV2() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ p: 3 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
        >
          ⏱ Meeting Timers
        </Typography>

        <IconButton
          color="primary"
          onClick={() =>
            navigate("/meeting-timer-settings")
          }
        >
          <SettingsIcon />
        </IconButton>
      </Stack>

      <Typography
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Practice your meeting assignments.
      </Typography>

      <TimerTabs
        value={tab}
        onChange={setTab}
      />

      {tab === 0 && (
        <Typography variant="h5">
          📚 Midweek Meeting
        </Typography>
      )}

      {tab === 1 && (
        <Typography variant="h5">
          📖 Weekend Meeting
        </Typography>
      )}

      {tab === 2 && (
        <Typography variant="h5">
          ⏱ Stopwatch
        </Typography>
      )}
    </Box>
  );
}