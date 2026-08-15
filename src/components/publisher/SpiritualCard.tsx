import {
  Card,
  CardContent,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
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
  value?: string;
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
        {value?.trim() || "—"}
      </Typography>
    </Stack>
  );
}

export default function SpiritualCard({
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
          Spiritual Information
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {!editMode ? (
          <Grid container spacing={3}>
            <Grid size={12}>
              <DisplayField
                label="Hope"
                value={publisher.hope}
              />
            </Grid>

            <Grid size={12}>
              <DisplayField
                label="Privileges"
                value={publisher.privileges}
              />
            </Grid>

            <Grid size={12}>
              <DisplayField
                label="Field Service Group"
                value={publisher.serviceGroup}
              />
            </Grid>

            <Grid size={12}>
              <DisplayField
                label="Baptized"
                value={publisher.baptized ? "Yes" : "No"}
              />
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={3}>
            <Grid size={12}>
              <Typography
                variant="subtitle2"
                sx={{ mb: 1 }}
              >
                Hope
              </Typography>

              <FormControl>
                <RadioGroup
                  row
                  value={publisher.hope || ""}
                  onChange={(e) =>
                    onChange("hope", e.target.value)
                  }
                >
                  <FormControlLabel
                    value="Other Sheep"
                    control={<Radio />}
                    label="Other Sheep"
                  />

                  <FormControlLabel
                    value="Anointed"
                    control={<Radio />}
                    label="Anointed"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                label="Privileges"
                value={publisher.privileges}
                onChange={(e) =>
                  onChange("privileges", e.target.value)
                }
              />
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                label="Field Service Group"
                value={publisher.serviceGroup}
                onChange={(e) =>
                  onChange("serviceGroup", e.target.value)
                }
              />
            </Grid>

            <Grid size={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={publisher.baptized}
                    onChange={(e) =>
                      onChange(
                        "baptized",
                        e.target.checked
                      )
                    }
                  />
                }
                label="Baptized Publisher"
              />
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
}