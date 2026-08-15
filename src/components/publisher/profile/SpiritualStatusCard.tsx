import {
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import { Publisher } from "../../../features/congregation/publishers/models/Publisher";
import ProfileSection from "./ProfileSection";

interface SpiritualStatusCardProps {
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

export default function SpiritualStatusCard({
  publisher,
}: SpiritualStatusCardProps) {
  return (
    <ProfileSection title="Spiritual Status">
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <InfoRow
            label="Publisher Status"
            value={publisher.publisherStatus}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Stack spacing={0.5}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontWeight: 600 }}
            >
              Baptism Status
            </Typography>

            <Chip
              size="small"
              color={
                publisher.baptized
                  ? "primary"
                  : "default"
              }
              label={
                publisher.baptized
                  ? "Baptized"
                  : "Unbaptized"
              }
              sx={{ width: "fit-content" }}
            />
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <InfoRow
            label="Baptism Date"
            value={publisher.baptismDate}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <InfoRow
            label="Publisher Since"
            value={publisher.publisherSince}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <InfoRow
            label="Ministerial Servant Since"
            value={publisher.appointedMS}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <InfoRow
            label="Elder Since"
            value={publisher.appointedElder}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <InfoRow
            label="Regular Pioneer Since"
            value={publisher.regularPioneerSince}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <InfoRow
            label="Auxiliary Pioneer Since"
            value={publisher.auxiliaryPioneerSince}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <InfoRow
            label="Congregation Group"
            value={publisher.congregationGroup}
          />
        </Grid>
      </Grid>
    </ProfileSection>
  );
}