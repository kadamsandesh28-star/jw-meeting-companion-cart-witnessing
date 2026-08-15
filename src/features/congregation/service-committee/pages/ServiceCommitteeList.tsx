import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import { publisherService } from "../../publishers/services/publisherService";
import { getPublisherDisplayName } from "../../publishers/utils/getPublisherDisplayName";
import { serviceCommitteeService } from "../services/serviceCommitteeService";

export default function ServiceCommitteeList() {
  const committees = serviceCommitteeService.getAll();
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

  return (
    <Box sx={{ p: 3 }}>
      <Stack spacing={3}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h4" fontWeight="bold">
            Service Committees
          </Typography>

          <Button
            component={RouterLink}
            to="/congregation/service-committee/new"
            variant="contained"
          >
            New Committee
          </Button>
        </Stack>

        {committees.length === 0 ? (
          <Card>
            <CardContent>
              <Typography color="text.secondary">
                No service committees have been created.
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Stack spacing={2}>
            {committees.map((committee) => (
              <Card
                key={committee.id}
                component={RouterLink}
                to={`/congregation/service-committee/${committee.id}`}
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <CardContent>
                  <Stack spacing={2}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                    >
                      {committee.name}
                    </Typography>

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

                    <Stack
                      direction="row"
                      spacing={1}
                      flexWrap="wrap"
                    >
                      <Chip
                        label={`${committee.memberPublisherIds.length} Members`}
                        size="small"
                      />

                      <Chip
                        label={`${committee.responsibilities.length} Responsibilities`}
                        size="small"
                      />
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Stack>
    </Box>
  );
}