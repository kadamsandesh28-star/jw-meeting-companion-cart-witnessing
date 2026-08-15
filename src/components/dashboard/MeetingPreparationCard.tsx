import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import {
  Card,
  CardContent,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import { getMeetingPreparationProgress } from "../../features/meeting-preparation/storage/meetingPreparationStorage";

export default function MeetingPreparationCard() {
  const navigate = useNavigate();

  const progress =
    getMeetingPreparationProgress();

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.5}
          >
            <ChecklistRoundedIcon color="primary" />

            <Stack flex={1}>
              <Typography
                variant="h6"
                fontWeight={700}
              >
                Meeting Preparation
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                {progress.completed} of{" "}
                {progress.total} complete
              </Typography>
            </Stack>

            <IconButton
              onClick={() =>
                navigate(
                  "/meeting-preparation"
                )
              }
              aria-label="Open Meeting Preparation"
            >
              <ChevronRightRoundedIcon />
            </IconButton>
          </Stack>

          <LinearProgress
            variant="determinate"
            value={progress.percentage}
            sx={{
              height: 8,
              borderRadius: 4,
            }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}