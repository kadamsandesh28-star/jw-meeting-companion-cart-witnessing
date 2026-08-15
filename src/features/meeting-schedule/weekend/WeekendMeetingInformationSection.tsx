import {
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { WeekendMeetingWeek } from "./models/WeekendMeetingSchedule";

interface Props {
  week: WeekendMeetingWeek;
  onChange: (
    week: WeekendMeetingWeek
  ) => void;
}

export default function WeekendMeetingInformationSection({
  week,
  onChange,
}: Props) {
  function update<
    K extends keyof WeekendMeetingWeek
  >(
    key: K,
    value: WeekendMeetingWeek[K]
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
        Weekend Meeting Information
      </Typography>

      <Divider />

      <Grid container spacing={2}>
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
            label="Public Talk Theme"
            value={week.publicTalkTheme}
            onChange={(e) =>
              update(
                "publicTalkTheme",
                e.target.value
              )
            }
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Public Talk Speaker"
            value={week.publicTalkSpeaker}
            onChange={(e) =>
              update(
                "publicTalkSpeaker",
                e.target.value
              )
            }
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="Middle Song"
            value={week.middleSong}
            onChange={(e) =>
              update(
                "middleSong",
                e.target.value
              )
            }
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="Watchtower Reader"
            value={week.watchtowerReader}
            onChange={(e) =>
              update(
                "watchtowerReader",
                e.target.value
              )
            }
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="Watchtower Conductor"
            value={week.watchtowerConductor}
            onChange={(e) =>
              update(
                "watchtowerConductor",
                e.target.value
              )
            }
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
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

        <Grid size={{ xs: 12, md: 8 }}>
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