import { Box } from "@mui/material";

import StopwatchCard from "../components/StopwatchCard";

export default function MeetingToolsPage() {
  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        p: 3,
        pb: 10,
      }}
    >
      <StopwatchCard />
    </Box>
  );
}