import AddRoundedIcon from "@mui/icons-material/AddRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";

import {
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

interface Props {
  onNewMeeting(): void;
}

export default function MeetingLibraryCard({
  onNewMeeting,
}: Props) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 3 }}
        >
          <Stack spacing={1}>
            <Typography
              variant="h5"
              fontWeight={700}
            >
              Meeting Library
            </Typography>

            <Typography color="text.secondary">
              Browse previous meetings or create a new
              Body of Elders meeting.
            </Typography>
          </Stack>

          <Button
            variant="contained"
            size="large"
            startIcon={<AddRoundedIcon />}
            onClick={onNewMeeting}
          >
            New Meeting
          </Button>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        <Stack spacing={3}>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
          >
            <HistoryRoundedIcon color="primary" />

            <Stack spacing={0.5}>
              <Typography fontWeight={700}>
                Meeting History
              </Typography>

              <Typography color="text.secondary">
                Access all previous Body of Elders
                meetings.
              </Typography>
            </Stack>
          </Stack>

          <Typography
            color="text.secondary"
            sx={{
              lineHeight: 1.8,
            }}
          >
            Every meeting is automatically saved.
            Open previous meetings, continue unfinished
            discussions, review minutes, assignments,
            attendance and export professional PDF
            reports.
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}