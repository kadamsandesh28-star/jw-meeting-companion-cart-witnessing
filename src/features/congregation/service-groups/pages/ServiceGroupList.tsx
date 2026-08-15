import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import GroupIcon from "@mui/icons-material/Group";
import MapIcon from "@mui/icons-material/Map";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { publisherService } from "../../publishers/services/publisherService";
import { getPublisherDisplayName } from "../../publishers/utils/getPublisherDisplayName";
import { useServiceGroups } from "../hooks/useServiceGroups";
import { serviceGroupService } from "../services/serviceGroupService";

export default function ServiceGroupList() {
  const { serviceGroups, refresh } = useServiceGroups();
  const navigate = useNavigate();

  const publishers = publisherService.getAll();

  const [groupToDelete, setGroupToDelete] = useState<string | null>(null);

  const getPublisherName = (publisherId?: string) => {
    if (!publisherId) return "Not Assigned";

    const publisher = publishers.find((p) => p.id === publisherId);

    return publisher
      ? getPublisherDisplayName(publisher)
      : "Not Assigned";
  };

  const handleDelete = () => {
    if (!groupToDelete) return;

    serviceGroupService.delete(groupToDelete);
    refresh();
    setGroupToDelete(null);
  };

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Typography variant="h4" fontWeight="bold">
            Service Groups
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() =>
              navigate("/congregation/service-groups/new")
            }
          >
            Add Service Group
          </Button>
        </Box>

        {serviceGroups.length === 0 ? (
          <Card>
            <CardContent sx={{ textAlign: "center", py: 6 }}>
              <Typography variant="h6" gutterBottom>
                No Service Groups Found
              </Typography>

              <Typography color="text.secondary" mb={3}>
                Create your first service group to begin organizing
                the congregation.
              </Typography>

              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() =>
                  navigate("/congregation/service-groups/new")
                }
              >
                Add Service Group
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Stack spacing={2}>
            {serviceGroups.map((group) => (
              <Card key={group.id}>
                <CardContent>
                  <Stack spacing={2}>
                    <Typography variant="h6" fontWeight="bold">
                      {group.name}
                    </Typography>

                    <Divider />

                    <Stack spacing={1}>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                      >
                        <PersonIcon
                          fontSize="small"
                          color="action"
                        />

                        <Typography variant="body2">
                          <strong>Overseer:</strong>{" "}
                          {getPublisherName(group.overseerPublisherId)}
                        </Typography>
                      </Stack>

                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                      >
                        <PersonIcon
                          fontSize="small"
                          color="action"
                        />

                        <Typography variant="body2">
                          <strong>Assistant:</strong>{" "}
                          {getPublisherName(
                            group.assistantPublisherId
                          )}
                        </Typography>
                      </Stack>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        📅 {group.meetingDay} • {group.meetingTime}
                      </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      <Chip
                        icon={<GroupIcon />}
                        label={`${group.publisherIds.length} Members`}
                        color="primary"
                        variant="outlined"
                      />

                      <Chip
                        icon={<MapIcon />}
                        label={`${group.territoryIds.length} Territories`}
                        color="success"
                        variant="outlined"
                      />
                    </Stack>

                    {group.notes && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {group.notes}
                      </Typography>
                    )}
                  </Stack>
                </CardContent>

                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Button
                    startIcon={<VisibilityIcon />}
                    onClick={() =>
                      navigate(
                        `/congregation/service-groups/${group.id}`
                      )
                    }
                  >
                    View
                  </Button>

                  <Button
                    startIcon={<EditIcon />}
                    onClick={() =>
                      navigate(
                        `/congregation/service-groups/${group.id}/edit`
                      )
                    }
                  >
                    Edit
                  </Button>

                  <Button
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() =>
                      setGroupToDelete(group.id)
                    }
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Stack>
        )}
      </Box>

      <Dialog
        open={groupToDelete !== null}
        onClose={() => setGroupToDelete(null)}
      >
        <DialogTitle>Delete Service Group</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this service group? This
            action cannot be undone.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setGroupToDelete(null)}>
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}