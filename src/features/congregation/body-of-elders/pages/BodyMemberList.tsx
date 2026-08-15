import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import WorkspaceHero from "../../../../components/workspace/WorkspaceHero";
import WorkspaceSearch from "../../../../components/workspace/WorkspaceSearch";
import WorkspaceCard from "../../../../components/workspace/WorkspaceCard";
import EmptyState from "../../../../components/workspace/EmptyState";

import { useBodyMembers } from "../hooks/useBodyMembers";
import { publisherService } from "../../publishers/services/publisherService";
import { getPublisherDisplayName } from "../../publishers/utils/getPublisherDisplayName";

export default function BodyMemberList() {
  const {
    bodyMembers,
    search,
    setSearch,
  } = useBodyMembers();

  const publishers = publisherService.getAll();

  return (
    <Box sx={{ p: 3 }}>
      <Stack spacing={3}>
        <WorkspaceHero
          title="Body of Elders"
          subtitle="Manage congregation elders, appointments and responsibilities."
          actionLabel="Add Elder"
          actionTo="/congregation/body-of-elders/new"
        />

        <WorkspaceSearch
          title="Search"
          value={search}
          onChange={setSearch}
          placeholder="Search by role..."
        />

        {bodyMembers.length === 0 ? (
          <EmptyState
            title="No elders found"
            description="Add your first elder to begin managing the body of elders."
            buttonLabel="Add Elder"
            buttonTo="/congregation/body-of-elders/new"
          />
        ) : (
          <Stack spacing={2}>
            {bodyMembers.map((member) => {
              const publisher = publishers.find(
                (p) => p.id === member.publisherId
              );

              return (
                <WorkspaceCard key={member.id}>
                  <Stack spacing={2}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                    >
                      <Box>
                        <Typography
                          variant="h6"
                          fontWeight={700}
                        >
                          {getPublisherDisplayName(publisher)}
                        </Typography>

                        <Typography color="text.secondary">
                          {member.role}
                        </Typography>
                      </Box>

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
                    </Stack>

                    <Typography color="text.secondary">
                      Appointment Date:{" "}
                      {member.appointmentDate || "-"}
                    </Typography>

                    <Stack
                      direction="row"
                      spacing={2}
                    >
                      <Button
                        component={Link}
                        to={`/congregation/body-of-elders/${member.id}`}
                      >
                        View
                      </Button>

                      <Button
                        component={Link}
                        variant="contained"
                        to={`/congregation/body-of-elders/${member.id}/edit`}
                      >
                        Edit
                      </Button>
                    </Stack>
                  </Stack>
                </WorkspaceCard>
              );
            })}
          </Stack>
        )}
      </Stack>
    </Box>
  );
}