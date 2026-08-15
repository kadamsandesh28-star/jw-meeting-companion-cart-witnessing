import { useState } from "react";

import {
  Grid,
  TextField,
} from "@mui/material";

import MeetingCard from "../../../../shared/meeting-workspace/MeetingCard";

export default function MeetingInfoCard() {
  const [location, setLocation] =
    useState("Kingdom Hall");

  return (
    <MeetingCard title="Meeting Information">
      <Grid
        container
        spacing={3}
      >
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <TextField
            fullWidth
            label="Meeting Type"
            value="Body of Elders Meeting"
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <TextField
            fullWidth
            type="date"
            label="Meeting Date"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <TextField
            fullWidth
            type="time"
            label="Start Time"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <TextField
            fullWidth
            label="Meeting Location"
            value={location}
            onChange={(e) =>
              setLocation(
                e.target.value
              )
            }
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <TextField
            fullWidth
            label="Chairman"
            placeholder="Select Brother"
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <TextField
            fullWidth
            label="Opening Prayer"
            placeholder="Select Brother"
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
          }}
        >
          <TextField
            fullWidth
            label="Closing Prayer"
            placeholder="Select Brother"
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
          }}
        >
          <TextField
            fullWidth
            multiline
            minRows={3}
            label="Meeting Objective"
            placeholder="Optional notes or purpose of this meeting..."
          />
        </Grid>
      </Grid>
    </MeetingCard>
  );
}