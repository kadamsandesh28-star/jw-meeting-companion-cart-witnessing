import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import {
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

interface Props {
  completed: number;
  total: number;
}

export default function ProgressCard({
  completed,
  total,
}: Props) {
  const progress =
    total > 0
      ? (completed / total) * 100
      : 0;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 4,
        border: 1,
        borderColor: "divider",
      }}
    >
      <Stack spacing={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <TrendingUpRoundedIcon color="primary" />

            <Typography
              variant="h6"
              fontWeight={700}
            >
              Today's Progress
            </Typography>
          </Stack>

          <Typography
            variant="h6"
            color="primary.main"
            fontWeight={700}
          >
            {Math.round(progress)}%
          </Typography>
        </Stack>

        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 10,
            borderRadius: 5,
          }}
        />

        <Typography
          variant="body1"
          color="text.primary"
          fontWeight={600}
        >
          {completed} of {total} activities completed
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          {completed === total && total > 0
            ? "Excellent! You've completed everything today."
            : "Keep going! Every completed activity moves you closer to your goals."}
        </Typography>
      </Stack>
    </Paper>
  );
}