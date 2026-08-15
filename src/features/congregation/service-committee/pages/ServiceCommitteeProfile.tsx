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
import { getPublisherDisplayName } from "../../publishers/utils/getPublisherDisplayName";
import { serviceCommitteeService } from "../services/serviceCommitteeService";

export default function ServiceCommitteeProfile() {
  const { id } = useParams();

  const committee = id
    ? serviceCommitteeService.getById(id)
    : undefined;

  const publishers = publisherService.getAll();

  const getPublisherName = (publisherId?: string) => {
    if (!publisherId) {
      return "Not Assigned";
    }

    const publisher = publishers.find(
      (p) => p.id === publisherId
    );

    return publisher
      ? getPublisherDisplayName(publisher)
      : "Unknown Publisher";
  };

  if (!committee) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5">
          Service Committee not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Stack spacing={3}>
        <Typography variant="h4" fontWeight="bold">
          {committee.name}
        </Typography>

        <Card>
          <CardContent>
            <Stack spacing={3}>
              <Typography>
                <strong>Coordinator:</strong>{" "}
                {getPublisherName(
                  committee.coordinatorPublisherId
                )}
              </Typography>

              <Typography>
                <strong>Secretary:</strong>{" "}
                {getPublisherName(
                  committee.secretaryPublisherId
                )}
              </Typography>

              <Typography>
                <strong>Service Overseer:</strong>{" "}
                {getPublisherName(
                  committee.serviceOverseerPublisherId
                )}
              </Typography>

              <Divider />

              <Typography variant="h6">
                Committee Members (
                {committee.memberPublisherIds.length})
              </Typography>

              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
              >
                {committee.memberPublisherIds.length > 0 ? (
                  committee.memberPublisherIds.map(
                    (publisherId) => (
                      <Chip
                        key={publisherId}
                        label={getPublisherName(
                          publisherId
                        )}
                      />
                    )
                  )
                ) : (
                  <Typography color="text.secondary">
                    No committee members assigned.
                  </Typography>
                )}
              </Stack>

              <Divider />

              <Typography variant="h6">
                Responsibilities
              </Typography>

              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
              >
                {committee.responsibilities.length >
                0 ? (
                  committee.responsibilities.map(
                    (responsibility) => (
                      <Chip
                        key={responsibility}
                        label={responsibility}
                      />
                    )
                  )
                ) : (
                  <Typography color="text.secondary">
                    No responsibilities assigned.
                  </Typography>
                )}
              </Stack>

              {committee.notes && (
                <>
                  <Divider />

                  <Typography variant="h6">
                    Notes
                  </Typography>

                  <Typography color="text.secondary">
                    {committee.notes}
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