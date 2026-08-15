import {
  Alert,
  Box,
  Button,
  Grid,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { Publisher } from "../../features/congregation/publishers/models/Publisher";

import { publisherService } from "../../services/publisherService";

import PublisherHeader from "../../components/publisher/PublisherHeader";
import PublisherDialog from "../../components/publisher/dialog/PublisherDialog";

import ContactCard from "../../components/publisher/profile/ContactCard";
import SpiritualStatusCard from "../../components/publisher/profile/SpiritualStatusCard";
import PrivilegesCard from "../../components/publisher/profile/PrivilegesCard";
import AssignmentsCard from "../../components/publisher/profile/AssignmentsCard";
import FamilyCard from "../../components/publisher/profile/FamilyCard";
import TimelineCard from "../../components/publisher/profile/TimelineCard";
import NotesCard from "../../components/publisher/profile/NotesCard";

export default function PublisherProfile() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [publisher, setPublisher] =
    useState<Publisher>();

  const [editOpen, setEditOpen] =
    useState(false);

  useEffect(() => {
    if (id) {
      setPublisher(
        publisherService.getById(id)
      );
    }
  }, [id]);

  if (!publisher) {
    return (
      <Alert severity="error">
        Publisher not found.
      </Alert>
    );
  }

  function handleSave(
    updatedPublisher: Publisher
  ) {
    publisherService.update(updatedPublisher);

    setPublisher(updatedPublisher);

    setEditOpen(false);
  }

  function handleArchive(
    publisherToArchive: Publisher
  ) {
    publisherService.archive(
      publisherToArchive.id
    );

    navigate("/congregation/directory");
  }

  return (
    <Box sx={{ pb: 4 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() =>
            navigate("/congregation/directory")
          }
        >
          Back to Directory
        </Button>
      </Stack>

      <PublisherHeader
        publisher={publisher}
       onEdit={() => {
  console.log("Edit clicked");
  setEditOpen(true);
}}
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ContactCard publisher={publisher} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <SpiritualStatusCard publisher={publisher} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <PrivilegesCard publisher={publisher} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <AssignmentsCard publisher={publisher} />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <FamilyCard publisher={publisher} />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TimelineCard publisher={publisher} />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <NotesCard publisher={publisher} />
        </Grid>
      </Grid>   

      <PublisherDialog
        open={editOpen}
        publisher={publisher}
        title="Edit Publisher"
        onClose={() => setEditOpen(false)}
        onSave={handleSave}
        onArchive={handleArchive}
      />
    </Box>
      );
}