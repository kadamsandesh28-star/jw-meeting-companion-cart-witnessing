import { useState } from "react";
import {
  Box,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";

import TimerTabs from "../components/TimerTabs";
import AssignmentRow from "../components/AssignmentRow";
import MeetingSectionCard from "../components/MeetingSectionCard";
import StopwatchPanel from "../components/StopwatchPanel";

import {
  midweekSections,
  weekendSections,
} from "../data/meetingSections";

export default function Timers() {
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

      {/* ================= MIDWEEK ================= */}

      {tab === 0 && (
        <>
          {midweekSections.map((section) => (
            <MeetingSectionCard
              key={section.title}
              title={section.title}
            >
              {section.assignments.map((assignment) => (
                <AssignmentRow
                  key={assignment.id}
                  id={assignment.id}
                  title={assignment.title}
                  minutes={assignment.minutes}
                />
              ))}
            </MeetingSectionCard>
          ))}
        </>
      )}

      {/* ================= WEEKEND ================= */}

      {tab === 1 && (
        <>
          {weekendSections.map((section) => (
            <MeetingSectionCard
              key={section.title}
              title={section.title}
            >
              {section.assignments.map((assignment) => (
                <AssignmentRow
                  key={assignment.id}
                  id={assignment.id}
                  title={assignment.title}
                  minutes={assignment.minutes}
                />
              ))}
            </MeetingSectionCard>
          ))}
        </>
      )}

      {/* ================= STOPWATCH ================= */}

      {tab === 2 && <StopwatchPanel />}
    </Box>
  );
}