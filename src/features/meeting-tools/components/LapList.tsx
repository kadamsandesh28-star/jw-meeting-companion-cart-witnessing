import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

import { StopwatchLap } from "../models/StopwatchLap";
import { formatTime } from "../utils/timeFormatter";

interface Props {
  laps: StopwatchLap[];
}

export default function LapList({
  laps,
}: Props) {
  if (laps.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 4,
          border: 1,
          borderColor: "divider",
          borderRadius: 4,
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <FlagRoundedIcon
            color="disabled"
            sx={{ fontSize: 40 }}
          />
        </Box>

        <Typography
          variant="subtitle1"
          fontWeight={600}
          gutterBottom
        >
          No laps recorded
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          Start the timer and tap{" "}
          <strong>Record Lap</strong> to
          keep track of important moments.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 4,
        overflow: "hidden",
      }}
    >
      <List disablePadding>
        {laps.map((lap, index) => (
          <ListItem
            key={lap.id}
            divider={index < laps.length - 1}
          >
            <ListItemIcon>
              <FlagRoundedIcon color="primary" />
            </ListItemIcon>

            <ListItemText
              primary={`Lap ${index + 1}`}
              secondary={formatTime(lap.time)}
              primaryTypographyProps={{
                fontWeight: 600,
              }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}