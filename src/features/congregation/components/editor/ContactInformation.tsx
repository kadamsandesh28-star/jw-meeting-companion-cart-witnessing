import { Grid, TextField } from "@mui/material";

import { Publisher } from "../../publishers/types/Publisher";

interface ContactInformationProps {
  publisher: Publisher;
  onChange: (publisher: Publisher) => void;
}

export default function ContactInformation({
  publisher,
  onChange,
}: ContactInformationProps) {
  const update = (field: keyof Publisher["contact"], value: string) => {
    onChange({
      ...publisher,
      contact: {
        ...publisher.contact,
        [field]: value,
      },
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Phone"
          value={publisher.contact.phone}
          onChange={(e) => update("phone", e.target.value)}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Email"
          value={publisher.contact.email}
          onChange={(e) => update("email", e.target.value)}
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          label="Address"
          multiline
          minRows={3}
          value={publisher.contact.address}
          onChange={(e) => update("address", e.target.value)}
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          label="Emergency Contact"
          value={publisher.contact.emergencyContact ?? ""}
          onChange={(e) => update("emergencyContact", e.target.value)}
        />
      </Grid>
    </Grid>
  );
}