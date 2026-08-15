import {
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

interface ProgressItem {
  title: string;
  completed: boolean;
}

interface WeeklyProgressCardProps {
  progress: ProgressItem[];
}

export default function WeeklyProgressCard({
  progress,
}: WeeklyProgressCardProps) {
  const completed = progress.filter((p) => p.completed).length;
  const percentage =
    progress.length === 0
      ? 0
      : (completed / progress.length) * 100;

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

        <Typography
          variant="h6"
          fontWeight={700}
          gutterBottom
        >
          📈 Weekly Progress
        </Typography>

        <LinearProgress
          variant="determinate"
          value={percentage}
          sx={{
            height: 10,
            borderRadius: 5,
            mb: 3,
          }}
        />

        <Typography
          variant="body2"
          color="text.secondary"
          mb={2}
        >
          {completed} of {progress.length} meeting goals completed
        </Typography>

        <Stack spacing={1}>
          {progress.map((item) => (
            <Stack
              key={item.title}
              direction="row"
              justifyContent="space-between"
            >
              <Typography>
                {item.title}
              </Typography>

              <Typography
                fontWeight={700}
                color={
                  item.completed
                    ? "success.main"
                    : "text.secondary"
                }
              >
                {item.completed ? "✓" : "○"}
              </Typography>
            </Stack>
          ))}
        </Stack>

      </CardContent>
    </Card>
  );
}