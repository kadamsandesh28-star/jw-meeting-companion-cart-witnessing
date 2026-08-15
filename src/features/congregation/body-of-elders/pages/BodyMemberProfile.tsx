import { Box, Chip, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import { bodyMemberService } from "../services/bodyMemberService";

export default function BodyMemberProfile() {
  const { id } = useParams();

  const member = id
    ? bodyMemberService.getById(id)
    : undefined;

  if (!member) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>
          Body member not found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Stack spacing={3}>
        <Typography
          variant="h4"
          fontWeight="bold"
        >
          {member.role}
        </Typography>

        <Chip
          label={
            member.active
              ? "Active"
              : "Inactive"
          }
          color={
            member.active
              ? "success"
              : "default"
          }
        />

        <Typography>
          <strong>Publisher ID:</strong>{" "}
          {member.publisherId || "Not Assigned"}
        </Typography>

        <Typography>
          <strong>Appointment Date:</strong>{" "}
          {member.appointmentDate}
        </Typography>

        <Typography>
          <strong>Notes:</strong>{" "}
          {member.notes || "None"}
        </Typography>
      </Stack>
    </Box>
  );
}