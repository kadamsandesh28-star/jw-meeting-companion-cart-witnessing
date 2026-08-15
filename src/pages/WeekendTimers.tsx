import { Box, Typography } from "@mui/material";

export default function WeekendTimers() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        📖 Weekend Meeting
      </Typography>

      <Typography color="text.secondary">
        Weekend meeting timers will appear here.
      </Typography>
    </Box>
  );
}