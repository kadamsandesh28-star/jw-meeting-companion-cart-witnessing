import {
  Container,
  Stack,
} from "@mui/material";

import MeetingDashboard from "../components/MeetingDashboard";
import MeetingScheduleHeader from "../components/MeetingScheduleHeader";

export default function MeetingSchedulePage() {
  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 4,
      }}
    >
      <Stack spacing={4}>
        <MeetingScheduleHeader />

        <MeetingDashboard />
      </Stack>
    </Container>
  );
}