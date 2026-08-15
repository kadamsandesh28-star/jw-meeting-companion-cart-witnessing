import {
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import { Publisher } from "../../../features/congregation/publishers/models/Publisher";
import ProfileSection from "./ProfileSection";

interface FamilyCardProps {
  publisher: Publisher;
}

export default function FamilyCard({
  publisher,
}: FamilyCardProps) {
  const family = publisher.family;

  return (
    <ProfileSection title="Family">
      {family.length === 0 ? (
        <Typography color="text.secondary">
          No family members recorded.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {family.map((member) => (
            <Grid
              key={member.id}
              size={{ xs: 12 }}
            >
              <Stack
                spacing={1}
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  p: 2,
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                  >
                    {member.firstName} {member.lastName}
                  </Typography>

                  <Chip
                    size="small"
                    label={member.relationship}
                    color="primary"
                  />
                </Stack>

                {member.dateOfBirth && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Date of Birth: {member.dateOfBirth}
                  </Typography>
                )}

                {member.phone && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Phone: {member.phone}
                  </Typography>
                )}

                {member.email && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Email: {member.email}
                  </Typography>
                )}

                {member.emergencyContact && (
                  <Chip
                    size="small"
                    color="success"
                    label="Emergency Contact"
                    sx={{ width: "fit-content" }}
                  />
                )}

                {member.notes && (
                  <Typography variant="body2">
                    {member.notes}
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