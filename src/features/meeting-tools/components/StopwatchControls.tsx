import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

import {
  Button,
  Stack,
} from "@mui/material";

interface Props {
  running: boolean;
  elapsed: number;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
  onLap: () => void;
}

export default function StopwatchControls({
  running,
  elapsed,
  onStart,
  onPause,
  onResume,
  onReset,
  onLap,
}: Props) {
  const hasStarted = elapsed > 0;

  const buttonSx = {
    flex: 1,
    minHeight: 52,
    borderRadius: 3,
    fontWeight: 700,
  };

  return (
    <Stack
      direction={{
        xs: "column",
        sm: "row",
      }}
      spacing={2}
      justifyContent="center"
      alignItems="stretch"
    >
      {!hasStarted ? (
        <Button
          variant="contained"
          size="large"
          fullWidth
          startIcon={<PlayArrowRoundedIcon />}
          onClick={onStart}
          sx={buttonSx}
        >
          Start Meeting Timer
        </Button>
      ) : running ? (
        <>
          <Button
            variant="contained"
            color="warning"
            size="large"
            startIcon={<PauseRoundedIcon />}
            onClick={onPause}
            sx={buttonSx}
          >
            Pause
          </Button>

          <Button
            variant="outlined"
            size="large"
            startIcon={<FlagRoundedIcon />}
            onClick={onLap}
            sx={buttonSx}
          >
            Record Lap
          </Button>

          <Button
            variant="outlined"
            color="error"
            size="large"
            startIcon={<RefreshRoundedIcon />}
            onClick={onReset}
            sx={buttonSx}
          >
            Reset
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="contained"
            size="large"
            startIcon={<PlayArrowRoundedIcon />}
            onClick={onResume}
            sx={buttonSx}
          >
            Resume
          </Button>

          <Button
            variant="outlined"
            color="error"
            size="large"
            startIcon={<RefreshRoundedIcon />}
            onClick={onReset}
            sx={buttonSx}
          >
            Reset
          </Button>
        </>
      )}
    </Stack>
  );
}