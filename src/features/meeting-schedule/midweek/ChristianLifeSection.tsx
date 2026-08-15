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

export default function ChristianLifeSection({
  week,
  onChange,
}: Props) {
  function updatePart(
    index: number,
    field:
      | "title"
      | "time"
      | "speaker",
    value: string
  ) {
    const parts = [
      ...week.christianLifeParts,
    ];

    parts[index] = {
      ...parts[index],
      [field]: value,
    };

    onChange({
      ...week,
      christianLifeParts: parts,
    });
  }

  function updateField<
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
        LIVING AS CHRISTIANS
      </Typography>

      <Divider />

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="Middle Song"
            value={week.middleSong}
            onChange={(e) =>
              updateField(
                "middleSong",
                e.target.value
              )
            }
          />
        </Grid>
      </Grid>

      {week.christianLifeParts.map(
        (part, index) => (
          <Stack
            key={index}
            spacing={2}
          >
            <Typography
              fontWeight={700}
            >
              Part {index + 1}
            </Typography>

            <Grid
              container
              spacing={2}
            >
              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                <TextField
                  fullWidth
                  label="Part Title"
                  value={part.title}
                  onChange={(e) =>
                    updatePart(
                      index,
                      "title",
                      e.target.value
                    )
                  }
                />
              </Grid>

              <Grid
                size={{
                  xs: 12,
                  md: 2,
                }}
              >
                <TextField
                  fullWidth
                  label="Time"
                  value={part.time}
                  onChange={(e) =>
                    updatePart(
                      index,
                      "time",
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
                  label="Speaker"
                  value={part.speaker}
                  onChange={(e) =>
                    updatePart(
                      index,
                      "speaker",
                      e.target.value
                    )
                  }
                />
              </Grid>
            </Grid>

            {index !==
              week.christianLifeParts
                .length -
                1 && <Divider />}
          </Stack>
        )
      )}

      <Divider />

      <Typography
        fontWeight={700}
      >
        Congregation Bible Study
      </Typography>

      <Grid
        container
        spacing={2}
      >
        <Grid
          size={{
            xs: 12,
            md: 3,
          }}
        >
          <TextField
            fullWidth
            label="Time"
            value={
              week.congregationBibleStudyTime
            }
            onChange={(e) =>
              updateField(
                "congregationBibleStudyTime",
                e.target.value
              )
            }
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 5,
          }}
        >
          <TextField
            fullWidth
            label="Conductor"
            value={
              week.congregationBibleStudyConductor
            }
            onChange={(e) =>
              updateField(
                "congregationBibleStudyConductor",
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
            label="Reader"
            value={
              week.congregationBibleStudyReader
            }
            onChange={(e) =>
              updateField(
                "congregationBibleStudyReader",
                e.target.value
              )
            }
          />
        </Grid>
      </Grid>
    </Stack>
  );
}