import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import PublisherManagementCard from "../../components/publisher/cards/PublisherManagementCard";
import PublisherDialog from "../../components/publisher/dialog/PublisherDialog";

import { Publisher } from "../../features/congregation/publishers/models/Publisher";
import { createEmptyPublisher } from "../../features/congregation/publishers/models/createEmptyPublisher";

import { publisherService } from "../../services/publisherService";

export default function CongregationDirectory() {
  const navigate = useNavigate();

  const [publishers, setPublishers] = useState(
    publisherService.getAll()
  );

  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);

  const [editingPublisher, setEditingPublisher] =
    useState<Publisher>(createEmptyPublisher());

  const filteredPublishers = useMemo(() => {
    const term = search.toLowerCase();

    return publishers.filter((publisher) =>
      [
        publisher.firstName,
        publisher.lastName,
        publisher.email,
        publisher.mobile,
        publisher.publisherStatus,
        publisher.congregationGroup,
      ]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [publishers, search]);

  const refreshPublishers = () => {
    setPublishers(publisherService.getAll());
  };

  const handleAddPublisher = () => {
    setEditingPublisher(createEmptyPublisher());
    setDialogOpen(true);
  };

  const handleEditPublisher = (publisher: Publisher) => {
    setEditingPublisher({ ...publisher });
    setDialogOpen(true);
  };

  const handleSavePublisher = (publisher: Publisher) => {
    const existing = publisherService.getById(publisher.id);

    if (existing) {
      publisherService.update(publisher);
    } else {
      publisherService.create(publisher);
    }

    refreshPublishers();
    setDialogOpen(false);
  };

  return (
    <Box p={3}>
      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        justifyContent="space-between"
        spacing={2}
        mb={3}
      >
        <Typography variant="h4">
          Congregation Directory
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddPublisher}
        >
          Add Publisher
        </Button>
      </Stack>

      <TextField
        fullWidth
        placeholder="Search publishers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Grid container spacing={3}>
        {filteredPublishers.map((publisher) => (
          <Grid
            key={publisher.id}
            size={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 4,
            }}
          >
            <PublisherManagementCard
              publisher={publisher}
              onViewProfile={(id) =>
                navigate(`/congregation/publisher/${id}`)
              }
              onEdit={handleEditPublisher}
              onArchive={(publisher) => {
                console.log(
                  "Archive:",
                  publisher.firstName
                );
              }}
            />
          </Grid>
        ))}
      </Grid>

      <PublisherDialog
        open={dialogOpen}
        title={
          publisherService.getById(editingPublisher.id)
            ? "Edit Publisher"
            : "Add Publisher"
        }
        publisher={editingPublisher}
        onClose={() => setDialogOpen(false)}
        onSave={handleSavePublisher}
      />
    </Box>
  );
}