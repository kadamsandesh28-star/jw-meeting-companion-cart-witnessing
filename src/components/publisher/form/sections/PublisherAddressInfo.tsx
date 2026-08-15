import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from "@mui/material";

import { Publisher } from "../../../../features/congregation/publishers/models/Publisher";

interface PublisherAddressInfoProps {
  publisher: Publisher;
  onChange: (publisher: Publisher) => void;
}

export default function PublisherAddressInfo({
  publisher,
  onChange,
}: PublisherAddressInfoProps) {
  function updateAddress(
    field: keyof NonNullable<Publisher["address"]>,
    value: string
  ) {
    onChange({
      ...publisher,
      address: {
        addressLine1: publisher.address?.addressLine1 ?? "",
        addressLine2: publisher.address?.addressLine2 ?? "",
        city: publisher.address?.city ?? "",
        state: publisher.address?.state ?? "",
        postalCode: publisher.address?.postalCode ?? "",
        country: publisher.address?.country ?? "",
        [field]: value,
      },
    });
  }

  return (
    <Card elevation={2}>
      <CardHeader title="Address Information" />

      <CardContent>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Address Line 1"
              value={publisher.address?.addressLine1 ?? ""}
              onChange={(e) =>
                updateAddress("addressLine1", e.target.value)
              }
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Address Line 2"
              value={publisher.address?.addressLine2 ?? ""}
              onChange={(e) =>
                updateAddress("addressLine2", e.target.value)
              }
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="City"
              value={publisher.address?.city ?? ""}
              onChange={(e) =>
                updateAddress("city", e.target.value)
              }
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="State / Province"
              value={publisher.address?.state ?? ""}
              onChange={(e) =>
                updateAddress("state", e.target.value)
              }
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="Postal Code"
              value={publisher.address?.postalCode ?? ""}
              onChange={(e) =>
                updateAddress("postalCode", e.target.value)
              }
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Country"
              value={publisher.address?.country ?? ""}
              onChange={(e) =>
                updateAddress("country", e.target.value)
              }
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}