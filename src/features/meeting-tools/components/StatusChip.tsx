import PauseCircleRoundedIcon from "@mui/icons-material/PauseCircleRounded";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import StopCircleRoundedIcon from "@mui/icons-material/StopCircleRounded";
import { Chip } from "@mui/material";

interface Props {
  running: boolean;
  elapsed: number;
}

export default function StatusChip({
  running,
  elapsed,
}: Props) {
  if (running) {
    return (
      <Chip
        color="success"
        icon={<PlayCircleRoundedIcon />}
        label="Running"
        size="medium"
        sx={{
          px: 1,
          height: 36,
          fontWeight: 700,
          borderRadius: 3,
          alignSelf: {
            xs: "center",
            sm: "flex-end",
          },
        }}
      />
    );
  }

  if (elapsed > 0) {
    return (
      <Chip
        color="warning"
        icon={<PauseCircleRoundedIcon />}
        label="Paused"
        size="medium"
        sx={{
          px: 1,
          height: 36,
          fontWeight: 700,
          borderRadius: 3,
          alignSelf: {
            xs: "center",
            sm: "flex-end",
          },
        }}
      />
    );
  }

  return (
    <Chip
      color="default"
      icon={<StopCircleRoundedIcon />}
      label="Stopped"
      size="medium"
      sx={{
        px: 1,
        height: 36,
        fontWeight: 700,
        borderRadius: 3,
        alignSelf: {
          xs: "center",
          sm: "flex-end",
        },
      }}
    />
  );
}