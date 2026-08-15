import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from "@mui/material";

import { Publisher } from "../../../../features/congregation/publishers/models/Publisher";

interface PublisherEmergencyContactProps {
  publisher: Publisher;
  onChange: (publisher: Publisher) => void;
}

export default function PublisherEmergencyContact({
  publisher,
  onChange,
}: PublisherEmergencyContactProps) {
  function update(
    field: keyof NonNullable<Publisher["emergencyContact"]>,
    value: string
  ) {
    onChange({
      ...publisher,
      emergencyContact: {
        name: publisher.emergencyContact?.name ?? "",
        relationship:
          publisher.emergencyContact?.relationship ?? "",
        phone: publisher.emergencyContact?.phone ?? "",
        [field]: value,
      },
    });
  }

  return (
    <Card elevation={2}>
      <CardHeader title="Emergency Contact" />

      <CardContent>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="Contact Name"
              value={
                publisher.emergencyContact?.name ?? ""
              }
              onChange={(e) =>
                update("name", e.target.value)
              }
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="Relationship"
              value={
                publisher.emergencyContact
                  ?.relationship ?? ""
              }
              onChange={(e) =>
                update(
                  "relationship",
                  e.target.value
                )
              }
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="Phone Number"
              value={
                publisher.emergencyContact?.phone ?? ""
              }
              onChange={(e) =>
                update("phone", e.target.value)
              }
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}