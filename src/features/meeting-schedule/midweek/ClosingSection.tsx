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

export default function ClosingSection({
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
        CLOSING
      </Typography>

      <Divider />

      <Grid
        container
        spacing={2}
      >
        <Grid
          size={{
            xs: 12,
          }}
        >
          <TextField
            fullWidth
            multiline
            rows={2}
            label="Concluding Comments"
            value={week.concludingComments}
            onChange={(e) =>
              update(
                "concludingComments",
                e.target.value
              )
            }
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 4,
          }}
        >
          <TextField
            fullWidth
            label="Closing Song"
            value={week.closingSong}
            onChange={(e) =>
              update(
                "closingSong",
                e.target.value
              )
            }
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 8,
          }}
        >
          <TextField
            fullWidth
            label="Closing Prayer"
            value={week.closingPrayer}
            onChange={(e) =>
              update(
                "closingPrayer",
                e.target.value
              )
            }
          />
        </Grid>
      </Grid>
    </Stack>
  );
}