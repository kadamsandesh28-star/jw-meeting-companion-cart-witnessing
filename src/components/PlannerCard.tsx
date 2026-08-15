import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { getMeetingProgress } from "../services/plannerService";

export default function PlannerCard() {
  const navigate = useNavigate();

  const midweek = getMeetingProgress("Midweek");
  const weekend = getMeetingProgress("Weekend");

  function getStatus(progress: number) {
    if (progress === 100) {
      return {
        text: "Ready",
        color: "success" as const,
      };
    }

    if (progress === 0) {
      return {
        text: "Not Started",
        color: "error" as const,
      };
    }

    return {
      text: "In Progress",
      color: "warning" as const,
    };
  }

  const midweekStatus = getStatus(midweek.progress);
  const weekendStatus = getStatus(weekend.progress);

  return (
    <Card
      elevation={3}
      sx={{
        mb: 4,
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
        >
          📅 This Week's Planner
        </Typography>

        {/* Midweek */}

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" fontWeight="bold">
            📚 Midweek Meeting Preparation
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mb: 1 }}
          >
            {midweek.ready} / {midweek.total} Assignments Ready
          </Typography>

          <LinearProgress
            variant="determinate"
            value={midweek.progress}
            color={midweekStatus.color}
            sx={{
              height: 10,
              borderRadius: 5,
              mb: 2,
            }}
          />

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Chip
              label={midweekStatus.text}
              color={midweekStatus.color}
            />

            <Button
              variant="contained"
              onClick={() => navigate("/timers")}
            >
              Continue
            </Button>
          </Stack>
        </Box>

        {/* Weekend */}

        <Box>
          <Typography variant="h6" fontWeight="bold">
            📖 Weekend Meeting Preparation
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mb: 1 }}
          >
            {weekend.ready} / {weekend.total} Assignments Ready
          </Typography>

          <LinearProgress
            variant="determinate"
            value={weekend.progress}
            color={weekendStatus.color}
            sx={{
              height: 10,
              borderRadius: 5,
              mb: 2,
            }}
          />

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Chip
              label={weekendStatus.text}
              color={weekendStatus.color}
            />

            <Button
              variant="contained"
              onClick={() => navigate("/timers")}
            >
              Continue
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}