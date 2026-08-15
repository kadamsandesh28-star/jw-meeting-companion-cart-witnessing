import {
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
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

function DisplayField({ label, value }: DisplayFieldProps) {
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

export default function PersonalCard({
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
          Personal Information
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {!editMode ? (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <DisplayField
                label="First Name"
                value={publisher.firstName}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <DisplayField
                label="Last Name"
                value={publisher.lastName}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <DisplayField
                label="Date of Birth"
                value={publisher.dateOfBirth}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <DisplayField
                label="Date of Baptism"
                value={publisher.dateOfBaptism}
              />
            </Grid>

            <Grid size={12}>
              <DisplayField
                label="Phone"
                value={publisher.phone}
              />
            </Grid>

            <Grid size={12}>
              <DisplayField
                label="Email"
                value={publisher.email}
              />
            </Grid>

            <Grid size={12}>
              <DisplayField
                label="Address"
                value={publisher.address}
              />
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="First Name"
                value={publisher.firstName}
                onChange={(e) =>
                  onChange("firstName", e.target.value)
                }
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Last Name"
                value={publisher.lastName}
                onChange={(e) =>
                  onChange("lastName", e.target.value)
                }
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="Date of Birth"
                value={publisher.dateOfBirth || ""}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                onChange={(e) =>
                  onChange("dateOfBirth", e.target.value)
                }
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="Date of Baptism"
                value={publisher.dateOfBaptism || ""}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                onChange={(e) =>
                  onChange("dateOfBaptism", e.target.value)
                }
              />
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                label="Phone"
                value={publisher.phone}
                onChange={(e) =>
                  onChange("phone", e.target.value)
                }
              />
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                label="Email"
                value={publisher.email}
                onChange={(e) =>
                  onChange("email", e.target.value)
                }
              />
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                label="Address"
                value={publisher.address || ""}
                onChange={(e) =>
                  onChange("address", e.target.value)
                }
              />
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
}