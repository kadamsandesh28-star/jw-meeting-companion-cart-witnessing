import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";

import {
  Gender,
  MaritalStatus,
  Publisher,
} from "../../../../features/congregation/publishers/models/Publisher";

interface PublisherBasicInfoProps {
  publisher: Publisher;
  onChange: (publisher: Publisher) => void;
}

const genders: Gender[] = [
  "Brother",
  "Sister",
];

const maritalStatuses: MaritalStatus[] = [
  "Single",
  "Married",
  "Widowed",
];

export default function PublisherBasicInfo({
  publisher,
  onChange,
}: PublisherBasicInfoProps) {
  function update<K extends keyof Publisher>(
    field: K,
    value: Publisher[K]
  ) {
    onChange({
      ...publisher,
      [field]: value,
    });
  }

  return (
    <Card elevation={2}>
      <CardHeader title="Publisher Information" />

      <CardContent>
        <Grid container spacing={2}>
          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >
            <TextField
              fullWidth
              required
              label="First Name"
              value={publisher.firstName}
              onChange={(e) =>
                update("firstName", e.target.value)
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
              label="Middle Name"
              value={publisher.middleName ?? ""}
              onChange={(e) =>
                update("middleName", e.target.value)
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
              required
              label="Last Name"
              value={publisher.lastName}
              onChange={(e) =>
                update("lastName", e.target.value)
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
              select
              fullWidth
              label="Gender"
              value={publisher.gender}
              onChange={(e) =>
                update(
                  "gender",
                  e.target.value as Gender
                )
              }
            >
              {genders.map((gender) => (
                <MenuItem
                  key={gender}
                  value={gender}
                >
                  {gender}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >
            <TextField
              select
              fullWidth
              label="Marital Status"
              value={publisher.maritalStatus}
              onChange={(e) =>
                update(
                  "maritalStatus",
                  e.target.value as MaritalStatus
                )
              }
            >
              {maritalStatuses.map((status) => (
                <MenuItem
                  key={status}
                  value={status}
                >
                  {status}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >
            <TextField
              fullWidth
              type="date"
              label="Date of Birth"
              value={publisher.dateOfBirth ?? ""}
              onChange={(e) =>
                update(
                  "dateOfBirth",
                  e.target.value
                )
              }
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
            }}
          >
            <TextField
              fullWidth
              label="Occupation"
              value={publisher.occupation ?? ""}
              onChange={(e) =>
                update(
                  "occupation",
                  e.target.value
                )
              }
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}