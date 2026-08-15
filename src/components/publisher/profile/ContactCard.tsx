import {
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import { Publisher } from "../../../features/congregation/publishers/models/Publisher";
import ProfileSection from "./ProfileSection";

interface ContactCardProps {
  publisher: Publisher;
}

interface InfoRowProps {
  label: string;
  value?: string | number;
}

function InfoRow({
  label,
  value,
}: InfoRowProps) {
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
        {value || "—"}
      </Typography>
    </Stack>
  );
}

export default function ContactCard({
  publisher,
}: ContactCardProps) {
  const address = publisher.address
    ? [
        publisher.address.addressLine1,
        publisher.address.addressLine2,
        publisher.address.city,
        publisher.address.state,
        publisher.address.postalCode,
        publisher.address.country,
      ]
        .filter(Boolean)
        .join(", ")
    : undefined;

  return (
    <ProfileSection title="Contact Information">
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <InfoRow
            label="First Name"
            value={publisher.firstName}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <InfoRow
            label="Last Name"
            value={publisher.lastName}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <InfoRow
            label="Gender"
            value={publisher.gender}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <InfoRow
            label="Marital Status"
            value={publisher.maritalStatus}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <InfoRow
            label="Date of Birth"
            value={publisher.dateOfBirth}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <InfoRow
            label="Occupation"
            value={publisher.occupation}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <InfoRow
            label="Phone"
            value={publisher.phone}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <InfoRow
            label="Mobile"
            value={publisher.mobile}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <InfoRow
            label="WhatsApp"
            value={publisher.whatsapp}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <InfoRow
            label="Email"
            value={publisher.email}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <InfoRow
            label="Address"
            value={address}
          />
        </Grid>
      </Grid>
    </ProfileSection>
  );
}