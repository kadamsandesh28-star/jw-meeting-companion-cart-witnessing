import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import { publisherService } from "../../publishers/services/publisherService";
import { serviceGroupService } from "../services/serviceGroupService";

export default function ServiceGroupProfile() {
  const { id } = useParams();

  const group = id
    ? serviceGroupService.getById(id)
    : undefined;

  const publishers = publisherService.getAll();

  const getPublisherName = (publisherId: string) => {
    const publisher = publishers.find(
      (p) => p.id === publisherId
    );

    return publisher
      ? `${publisher.firstName} ${publisher.lastName}`
      : "Unknown Publisher";
  };

  if (!group) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5">
          Service Group not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Stack spacing={3}>
        <Typography variant="h4" fontWeight="bold">
          {group.name}
        </Typography>

        <Card>
          <CardContent>
            <Stack spacing={3}>
              <Typography>
                <strong>Meeting:</strong>{" "}
                {group.meetingDay} at {group.meetingTime}
              </Typography>

              <Divider />

              <Typography>
                <strong>Overseer:</strong>{" "}
                {group.overseerPublisherId
                  ? getPublisherName(group.overseerPublisherId)
                  : "Not Assigned"}
              </Typography>

              <Typography>
                <strong>Assistant:</strong>{" "}
                {group.assistantPublisherId
                  ? getPublisherName(group.assistantPublisherId)
                  : "Not Assigned"}
              </Typography>

              <Divider />

              <Typography variant="h6">
                Members ({group.publisherIds.length})
              </Typography>

              <Stack spacing={1}>
                {group.publisherIds.length > 0 ? (
                  group.publisherIds.map((publisherId) => (
                    <Chip
                      key={publisherId}
                      label={getPublisherName(publisherId)}
                      size="small"
                    />
                  ))
                ) : (
                  <Typography color="text.secondary">
                    No members assigned.
                  </Typography>
                )}
              </Stack>

              <Divider />

              <Typography>
                <strong>Territories:</strong>{" "}
                {group.territoryIds.length}
              </Typography>

              <Stack direction="row" spacing={1} flexWrap="wrap">
                {group.territoryIds.map((territoryId) => (
                  <Chip
                    key={territoryId}
                    label={territoryId}
                    size="small"
                  />
                ))}
              </Stack>

              {group.notes && (
                <>
                  <Divider />

                  <Typography variant="h6">
                    Notes
                  </Typography>

                  <Typography color="text.secondary">
                    {group.notes}
                  </Typography>
                </>
              )}
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}