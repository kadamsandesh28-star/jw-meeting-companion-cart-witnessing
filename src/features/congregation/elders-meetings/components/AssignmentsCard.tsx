import AddRoundedIcon from "@mui/icons-material/AddRounded";

import {
  Button,
  Stack,
  Typography,
} from "@mui/material";

import MeetingCard from "../../../../shared/meeting-workspace/MeetingCard";

export default function AssignmentsCard() {
  return (
    <MeetingCard
      title="Assignments"
      subtitle="Outstanding responsibilities from this meeting."
    >
      <Stack
        spacing={2}
      >
        <Typography
          color="text.secondary"
        >
          No assignments yet.
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
        >
          Add Assignment
        </Button>
      </Stack>
    </MeetingCard>
  );
}