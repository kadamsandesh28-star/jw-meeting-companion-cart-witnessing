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

export default function ApplySection({
  week,
  onChange,
}: Props) {
  function updateAssignment(
    index: number,
    field:
      | "title"
      | "time"
      | "student"
      | "assistant",
    value: string
  ) {
    const assignments = [
      ...week.applyAssignments,
    ];

    assignments[index] = {
      ...assignments[index],
      [field]: value,
    };

    onChange({
      ...week,
      applyAssignments: assignments,
    });
  }

  return (
    <Stack spacing={3}>
      <Typography
        variant="h6"
        fontWeight={700}
        color="success.main"
      >
        APPLY YOURSELF TO THE FIELD
        MINISTRY
      </Typography>

      <Divider />

      {week.applyAssignments.map(
        (
          assignment,
          index
        ) => (
          <Stack
            key={index}
            spacing={2}
          >
            <Typography
              fontWeight={700}
            >
              Assignment {index + 1}
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
                  label="Assignment"
                  value={
                    assignment.title
                  }
                  onChange={(e) =>
                    updateAssignment(
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
                  value={
                    assignment.time
                  }
                  onChange={(e) =>
                    updateAssignment(
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
                  md: 2,
                }}
              >
                <TextField
                  fullWidth
                  label="Student"
                  value={
                    assignment.student
                  }
                  onChange={(e) =>
                    updateAssignment(
                      index,
                      "student",
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
                  label="Assistant"
                  value={
                    assignment.assistant
                  }
                  onChange={(e) =>
                    updateAssignment(
                      index,
                      "assistant",
                      e.target.value
                    )
                  }
                />
              </Grid>
            </Grid>

            {index !==
              week.applyAssignments
                .length -
                1 && (
              <Divider />
            )}
          </Stack>
        )
      )}
    </Stack>
  );
}