import {
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import { Publisher } from "../../services/congregationService";

interface Props {
  publisher: Publisher;
  editMode: boolean;
  onChange: (field: keyof Publisher, value: any) => void;
}

interface DisplayFieldProps {
  label: string;
  value: string;
}

function DisplayField({
  label,
  value,
}: DisplayFieldProps) {
  return (
    <Stack spacing={0.5}>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ fontWeight: 600 }}
      >
        {label}
      </Typography>

      <Typography variant="body1">
        {value}
      </Typography>
    </Stack>
  );
}

export default function MinistryCard({
  publisher,
  editMode,
  onChange,
}: Props) {
  return (
    <Card
      elevation={3}
      sx={{
        height: "100%",
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
        >
          Ministry
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {!editMode ? (
          <Grid container spacing={3}>
            <Grid size={12}>
              <DisplayField
                label="Participated This Month"
                value={
                  publisher.participatedThisMonth
                    ? "Yes"
                    : "No"
                }
              />
            </Grid>

            <Grid size={12}>
              <DisplayField
                label="Auxiliary Pioneer"
                value={
                  publisher.auxiliaryPioneerThisMonth
                    ? "Yes"
                    : "No"
                }
              />
            </Grid>

            <Grid size={12}>
              <DisplayField
                label="Bible Studies"
                value={String(
                  publisher.bibleStudiesThisMonth ?? 0
                )}
              />
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={3}>
            <Grid size={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={
                      publisher.participatedThisMonth ??
                      false
                    }
                    onChange={(e) =>
                      onChange(
                        "participatedThisMonth",
                        e.target.checked
                      )
                    }
                  />
                }
                label="Participated This Month"
              />
            </Grid>

            <Grid size={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={
                      publisher.auxiliaryPioneerThisMonth ??
                      false
                    }
                    onChange={(e) =>
                      onChange(
                        "auxiliaryPioneerThisMonth",
                        e.target.checked
                      )
                    }
                  />
                }
                label="Auxiliary Pioneer"
              />
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                type="number"
                label="Bible Studies"
                value={
                  publisher.bibleStudiesThisMonth ?? 0
                }
                onChange={(e) =>
                  onChange(
                    "bibleStudiesThisMonth",
                    Number(e.target.value)
                  )
                }
                slotProps={{
                  htmlInput: {
                    min: 0,
                  },
                }}
              />
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
}