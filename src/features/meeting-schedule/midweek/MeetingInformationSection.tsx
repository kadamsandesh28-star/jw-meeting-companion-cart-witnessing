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

export default function MeetingInformationSection({
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
        Meeting Information
      </Typography>

      <Divider />

      <Grid
        container
        spacing={2}
      >
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Meeting Date"
            value={week.meetingDate}
            onChange={(e) =>
              update(
                "meetingDate",
                e.target.value
              )
            }
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Bible Reading"
            value={week.bibleReading}
            onChange={(e) =>
              update(
                "bibleReading",
                e.target.value
              )
            }
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Chairman"
            value={week.chairman}
            onChange={(e) =>
              update(
                "chairman",
                e.target.value
              )
            }
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Auxiliary Classroom Counselor"
            value={week.auxiliaryCounselor}
            onChange={(e) =>
              update(
                "auxiliaryCounselor",
                e.target.value
              )
            }
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="Opening Song"
            value={week.openingSong}
            onChange={(e) =>
              update(
                "openingSong",
                e.target.value
              )
            }
          />
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <TextField
            fullWidth
            label="Opening Prayer"
            value={week.openingPrayer}
            onChange={(e) =>
              update(
                "openingPrayer",
                e.target.value
              )
            }
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            multiline
            rows={2}
            label="Opening Comments"
            value={week.openingComments}
            onChange={(e) =>
              update(
                "openingComments",
                e.target.value
              )
            }
          />
        </Grid>
      </Grid>
    </Stack>
  );
}