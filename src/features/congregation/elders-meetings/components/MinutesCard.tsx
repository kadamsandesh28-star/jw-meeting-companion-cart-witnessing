import {
  TextField,
} from "@mui/material";

import MeetingCard from "../../../../shared/meeting-workspace/MeetingCard";

export default function MinutesCard() {
  return (
    <MeetingCard
      title="General Meeting Minutes"
      subtitle="Record decisions and important discussion points."
    >
      <TextField
        fullWidth
        multiline
        minRows={12}
        placeholder="Write the meeting minutes here..."
      />
    </MeetingCard>
  );
}