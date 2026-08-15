import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import {
  Paper,
  Stack,
  Typography,
} from "@mui/material";

export default function ScheduleHeader() {
  const today = new Date();

  const date = today.toLocaleDateString(
    undefined,
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  let greeting = "Good Morning";

  const hour = today.getHours();

  if (hour >= 12 && hour < 17) {
    greeting = "Good Afternoon";
  } else if (hour >= 17) {
    greeting = "Good Evening";
  }

  return (
    <Paper
      elevation={0}
      sx={{
        mb: 3,
        p: 3,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
      >
        <TodayRoundedIcon
          color="primary"
          sx={{
            fontSize: 40,
          }}
        />

        <Stack spacing={0.5}>
          <Typography
            variant="overline"
            sx={{
              letterSpacing: 2,
              color: "primary.main",
              fontWeight: 700,
            }}
          >
            {greeting}
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "text.primary",
            }}
          >
            Life Schedule
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <CalendarMonthRoundedIcon
              sx={{
                fontSize: 18,
                color: "text.secondary",
              }}
            />

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {date}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
}