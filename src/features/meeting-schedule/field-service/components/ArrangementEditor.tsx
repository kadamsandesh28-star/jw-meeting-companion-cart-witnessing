import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutline";

import {
  Card,
  CardContent,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";

import {
  FieldServiceArrangement,
} from "../models/FieldServiceSchedule";

interface Props {
  arrangement: FieldServiceArrangement;

  onChange: (
    arrangement: FieldServiceArrangement
  ) => void;

  onDelete?: () => void;
}

export default function ArrangementEditor({
  arrangement,
  onChange,
  onDelete,
}: Props) {
  function update(
    field: keyof FieldServiceArrangement,
    value: string
  ) {
    onChange({
      ...arrangement,
      [field]: value,
    });
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <Stack
            direction="row"
            justifyContent="flex-end"
          >
            {onDelete && (
              <Tooltip title="Delete Arrangement">
                <IconButton
                  color="error"
                  onClick={onDelete}
                >
                  <DeleteOutlineRoundedIcon />
                </IconButton>
              </Tooltip>
            )}
          </Stack>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                label="Time"
                value={arrangement.time}
                onChange={(e) =>
                  update("time", e.target.value)
                }
              />
            </Grid>

            <Grid size={{ xs: 12, md: 9 }}>
              <TextField
                fullWidth
                label="Arrangement"
                value={arrangement.arrangement}
                onChange={(e) =>
                  update(
                    "arrangement",
                    e.target.value
                  )
                }
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Location"
                value={arrangement.location}
                onChange={(e) =>
                  update(
                    "location",
                    e.target.value
                  )
                }
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Conductor"
                value={arrangement.conductor}
                onChange={(e) =>
                  update(
                    "conductor",
                    e.target.value
                  )
                }
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                minRows={2}
                label="Notes"
                value={arrangement.notes}
                onChange={(e) =>
                  update(
                    "notes",
                    e.target.value
                  )
                }
              />
            </Grid>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
}