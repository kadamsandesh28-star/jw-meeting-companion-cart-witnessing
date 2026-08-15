import {
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import { Publisher } from "../../../features/congregation/publishers/models/Publisher";
import { AssignmentStatus } from "../../../features/congregation/publishers/models/Assignment";
import ProfileSection from "./ProfileSection";

interface AssignmentsCardProps {
  publisher: Publisher;
}

function getStatusColor(status: AssignmentStatus) {
  switch (status) {
    case AssignmentStatus.Completed:
      return "success";

    case AssignmentStatus.Scheduled:
      return "primary";

    case AssignmentStatus.Cancelled:
      return "error";

    case AssignmentStatus.Reassigned:
      return "warning";

    default:
      return "default";
  }
}

export default function AssignmentsCard({
  publisher,
}: AssignmentsCardProps) {
  const assignments = [...publisher.assignments].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  return (
    <ProfileSection title="Assignments">
      {assignments.length === 0 ? (
        <Typography color="text.secondary">
          No assignments recorded.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {assignments.map((assignment) => (
            <Grid
              key={assignment.id}
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
                    {assignment.title ?? assignment.type}
                  </Typography>

                  <Chip
                    size="small"
                    color={getStatusColor(
                      assignment.status
                    )}
                    label={assignment.status}
                  />
                </Stack>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Type: {assignment.type}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Date: {assignment.date}
                </Typography>

                {assignment.startTime && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Time: {assignment.startTime}
                    {assignment.endTime
                      ? ` - ${assignment.endTime}`
                      : ""}
                  </Typography>
                )}

                {assignment.location && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Location: {assignment.location}
                  </Typography>
                )}

                {assignment.notes && (
                  <Typography variant="body2">
                    {assignment.notes}
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