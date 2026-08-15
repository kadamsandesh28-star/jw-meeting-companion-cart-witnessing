import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

import {
  Button,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { WorshipTemplate } from "../models/WorshipTemplate";

interface Props {
  template: WorshipTemplate;
  onStart: (
    template: WorshipTemplate
  ) => void;
}

export default function WorshipOfTheWeekCard({
  template,
  onStart,
}: Props) {
  return (
    <Paper
      elevation={0}
      sx={{
        mb: 3,
        p: 4,
        borderRadius: 4,
        border: 1,
        borderColor: "divider",
        background:
          "linear-gradient(135deg,#fff8e1,#fff3e0)",
      }}
    >
      <Stack spacing={2}>
        <Typography
          variant="overline"
          color="primary"
        >
          Worship of the Week
        </Typography>

        <Typography
          variant="h4"
          fontWeight={700}
        >
          {template.icon} {template.name}
        </Typography>

        <Typography
          color="text.secondary"
        >
          {template.theme}
        </Typography>

        <Typography>
          📖 {template.bibleReading}
        </Typography>

        <Button
          variant="contained"
          startIcon={
            <AutoAwesomeRoundedIcon />
          }
          onClick={() =>
            onStart(template)
          }
        >
          Start This Worship
        </Button>
      </Stack>
    </Paper>
  );
}