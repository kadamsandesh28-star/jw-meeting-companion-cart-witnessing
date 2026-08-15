import {
  Button,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import useStopwatch from "../hooks/useStopwatch";

export default function StopwatchPanel() {
  const {
    formattedTime,
    running,
    start,
    pause,
    reset,
  } = useStopwatch();

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 3,
        textAlign: "center",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
      >
        ⏱ Stopwatch
      </Typography>

      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
          my: 4,
          fontFamily: "monospace",
        }}
      >
        {formattedTime}
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
      >
        {!running ? (
          <Button
            variant="contained"
            onClick={start}
          >
            ▶ Start
          </Button>
        ) : (
          <Button
            variant="outlined"
            onClick={pause}
          >
            ⏸ Pause
          </Button>
        )}

        <Button
          color="error"
          variant="contained"
          onClick={reset}
        >
          🔄 Reset
        </Button>
      </Stack>
    </Paper>
  );
}