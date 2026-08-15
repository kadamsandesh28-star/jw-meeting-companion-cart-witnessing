import {
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import { Publisher } from "../../../features/congregation/publishers/models/Publisher";
import ProfileSection from "./ProfileSection";

interface PrivilegesCardProps {
  publisher: Publisher;
}

export default function PrivilegesCard({
  publisher,
}: PrivilegesCardProps) {
  const activePrivileges = publisher.privileges.filter(
    (privilege) => privilege.active
  );

  return (
    <ProfileSection title="Privileges">
      {activePrivileges.length === 0 ? (
        <Typography color="text.secondary">
          No active privileges assigned.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {activePrivileges.map((privilege) => (
            <Grid
              key={privilege.id}
              size={{ xs: 12 }}
            >
              <Stack spacing={1}>
                <Chip
                  label={privilege.type}
                  color="primary"
                  sx={{ width: "fit-content" }}
                />

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Assigned:
                  {" "}
                  {privilege.assignedDate ?? "Unknown"}
                </Typography>

                {privilege.notes && (
                  <Typography variant="body2">
                    {privilege.notes}
                  </Typography>
                )}
              </Stack>
            </Grid>
          ))}
        </Grid>
      )}
    </ProfileSection>
  );
}