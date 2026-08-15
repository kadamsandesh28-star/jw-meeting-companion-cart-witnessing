import { Box, Typography } from "@mui/material";

export default function MidweekTimers() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        📚 Midweek Meeting
      </Typography>

      <Typography color="text.secondary">
        Midweek meeting assignments will appear here.
      </Typography>
    </Box>
  );
}