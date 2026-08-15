import {
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { MidweekMeetingWeek } from "../models/MidweekMeetingSchedule";

interface Props {
  week: MidweekMeetingWeek;
  onChange: (
    week: MidweekMeetingWeek
  ) => void;
}

export default function TreasuresSection({
  week,
  onChange,
}: Props) {
  function update<
    K extends keyof MidweekMeetingWeek
  >(
    key: K,
    value: MidweekMeetingWeek[K]
  ) {
    onChange({
      ...week,
      [key]: value,
    });
  }

  return (
    <Stack spacing={3}>
      <Typography
        variant="h6"
        fontWeight={700}
        color="success.main"
      >
        TREASURES FROM GOD'S WORD
      </Typography>

      <Divider />

      <Grid
        container
        spacing={2}
      >
        <Grid size={{ xs: 12, md: 8 }}>
          <TextField
            fullWidth
            label="Talk Theme"
            value={week.treasuresTalkTitle}
            onChange={(e) =>
              update(
                "treasuresTalkTitle",
                e.target.value
              )
            }
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="Time"
            value={week.treasuresTalkTime}
            onChange={(e) =>
              update(
                "treasuresTalkTime",
                e.target.value
              )
            }
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Assigned Brother"
            value={week.treasuresTalkBrother}
            onChange={(e) =>
              update(
                "treasuresTalkBrother",
                e.target.value
              )
            }
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Spiritual Gems Time"
            value={week.spiritualGemsTime}
            onChange={(e) =>
              update(
                "spiritualGemsTime",
                e.target.value
              )
            }
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Spiritual Gems Brother"
            value={week.spiritualGemsBrother}
            onChange={(e) =>
              update(
                "spiritualGemsBrother",
                e.target.value
              )
            }
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="Bible Reading Time"
            value={week.bibleReadingTime}
            onChange={(e) =>
              update(
                "bibleReadingTime",
                e.target.value
              )
            }
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="Student"
            value={week.bibleReadingStudent}
            onChange={(e) =>
              update(
                "bibleReadingStudent",
                e.target.value
              )
            }
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="Assistant"
            value={week.bibleReadingAssistant}
            onChange={(e) =>
              update(
                "bibleReadingAssistant",
                e.target.value
              )
            }
          />
        </Grid>
      </Grid>
    </Stack>
  );
}