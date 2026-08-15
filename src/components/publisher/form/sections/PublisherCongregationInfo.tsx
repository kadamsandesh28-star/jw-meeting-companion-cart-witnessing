import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";

import {
  Publisher,
  PublisherStatus,
} from "../../../../features/congregation/publishers/models/Publisher";

interface PublisherCongregationInfoProps {
  publisher: Publisher;
  onChange: (publisher: Publisher) => void;
}

const publisherStatuses: PublisherStatus[] = [
  "Publisher",
  "Unbaptized Publisher",
  "Baptized Publisher",
  "Auxiliary Pioneer",
  "Regular Pioneer",
  "Ministerial Servant",
  "Elder",
];

export default function PublisherCongregationInfo({
  publisher,
  onChange,
}: PublisherCongregationInfoProps) {
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
      <CardHeader title="Congregation Information" />

      <CardContent>
        <Grid container spacing={2}>
          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <TextField
              select
              fullWidth
              label="Publisher Status"
              value={publisher.publisherStatus}
              onChange={(e) =>
                update(
                  "publisherStatus",
                  e.target.value as PublisherStatus
                )
              }
            >
              {publisherStatuses.map((status) => (
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
              md: 6,
            }}
          >
            <TextField
              fullWidth
              type="number"
              label="Congregation Group"
              value={publisher.congregationGroup}
              onChange={(e) =>
                update(
                  "congregationGroup",
                  Number(e.target.value)
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
              type="date"
              label="Publisher Since"
              value={publisher.publisherSince ?? ""}
              onChange={(e) =>
                update(
                  "publisherSince",
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
              md: 6,
            }}
          >
            <TextField
              fullWidth
              type="date"
              label="Baptism Date"
              value={publisher.baptismDate ?? ""}
              onChange={(e) =>
                update(
                  "baptismDate",
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
              md: 6,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={publisher.baptized}
                  onChange={(e) =>
                    update(
                      "baptized",
                      e.target.checked
                    )
                  }
                />
              }
              label="Baptized"
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={publisher.active}
                  onChange={(e) =>
                    update(
                      "active",
                      e.target.checked
                    )
                  }
                />
              }
              label="Active Publisher"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}