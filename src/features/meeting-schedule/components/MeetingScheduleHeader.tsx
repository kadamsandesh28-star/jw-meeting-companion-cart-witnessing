import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";

import {
  Stack,
  Typography,
} from "@mui/material";

export default function MeetingScheduleHeader() {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      textAlign="center"
    >
      <EventNoteRoundedIcon
        color="success"
        sx={{
          fontSize: 60,
        }}
      />

      <Typography
        variant="h3"
        fontWeight={700}
      >
        Congregation Schedule
      </Typography>

      <Typography
        variant="h6"
        color="text.secondary"
        sx={{
          maxWidth: 750,
        }}
      >
        Prepare monthly congregation schedules,
        assign brothers, organize meeting parts,
        and export professional PDF schedules for
        publishers.
      </Typography>

      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
      >
        <GroupsRoundedIcon
          color="success"
          fontSize="small"
        />

        <Typography
          variant="body2"
          color="text.secondary"
        >
          Midweek • Weekend • Field Service • Other
          Schedules
        </Typography>
      </Stack>
    </Stack>
  );
}