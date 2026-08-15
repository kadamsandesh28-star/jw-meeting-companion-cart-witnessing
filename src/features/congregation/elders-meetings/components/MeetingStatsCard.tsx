import {
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";

interface StatRowProps {
  title: string;
  value: string | number;
}

function StatRow({
  title,
  value,
}: StatRowProps) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography color="text.secondary">
        {title}
      </Typography>

      <Typography fontWeight={700}>
        {value}
      </Typography>
    </Stack>
  );
}

export default function MeetingStatsCard() {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        height: "100%",
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Stack spacing={3}>
          <Typography
            variant="h5"
            fontWeight={700}
          >
            Statistics
          </Typography>

          <Divider />

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
          >
            <EventNoteRoundedIcon color="primary" />

            <StatRow
              title="Total Meetings"
              value={0}
            />
          </Stack>

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
          >
            <AssignmentTurnedInRoundedIcon
              color="success"
            />

            <StatRow
              title="Completed Assignments"
              value={0}
            />
          </Stack>

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
          >
            <ScheduleRoundedIcon
              color="warning"
            />

            <StatRow
              title="Average Duration"
              value="0 min"
            />
          </Stack>

          <Divider />

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              lineHeight: 1.8,
            }}
          >
            Meeting analytics will automatically
            update as additional meetings,
            assignments, and agendas are created.
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}