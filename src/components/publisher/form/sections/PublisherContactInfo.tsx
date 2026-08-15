import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from "@mui/material";

import { Publisher } from "../../../../features/congregation/publishers/models/Publisher";

interface PublisherContactInfoProps {
  publisher: Publisher;
  onChange: (publisher: Publisher) => void;
}

export default function PublisherContactInfo({
  publisher,
  onChange,
}: PublisherContactInfoProps) {
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
      <CardHeader title="Contact Information" />

      <CardContent>
        <Grid container spacing={2}>
          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={publisher.email ?? ""}
              onChange={(e) =>
                update("email", e.target.value)
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
              label="Phone"
              value={publisher.phone ?? ""}
              onChange={(e) =>
                update("phone", e.target.value)
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
              label="Mobile"
              value={publisher.mobile ?? ""}
              onChange={(e) =>
                update("mobile", e.target.value)
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
              label="WhatsApp"
              value={publisher.whatsapp ?? ""}
              onChange={(e) =>
                update("whatsapp", e.target.value)
              }
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}