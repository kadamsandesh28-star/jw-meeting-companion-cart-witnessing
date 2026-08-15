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

import { Publisher } from "../../features/congregation/publishers/models/Publisher";

import { publisherService } from "../../services/publisherService";

import PublisherManagementCard from "../../components/publisher/cards/PublisherManagementCard";

export default function PublisherManagement() {
  const navigate = useNavigate();

  const [publishers, setPublishers] = useState<Publisher[]>(
    publisherService.getAll()
  );

  const [searchText, setSearchText] =
    useState("");

  const filteredPublishers = useMemo(() => {
    if (!searchText.trim()) {
      return publishers;
    }

    return publisherService.search(searchText);
  }, [publishers, searchText]);

  const refreshPublishers = () => {
    setPublishers(
      publisherService.getAll()
    );
  };

 const handleAddPublisher = () => {
  console.log("Add Publisher clicked");
  navigate("/congregation/publishers/new");
};

  const handleEditPublisher = (
    publisher: Publisher
  ) => {
    // We'll migrate Edit to the new page
    // in the next step.
    console.log(
      "Edit Publisher:",
      publisher.id
    );
  };

  const handleArchivePublisher = (
    publisher: Publisher
  ) => {
    publisherService.archive(
      publisher.id
    );

    refreshPublishers();
  };

  const handleViewProfile = (
    publisherId: string
  ) => {
    navigate(
      `/congregation/publisher/${publisherId}`
    );
  };

  return (
    <Box p={3}>
      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        justifyContent="space-between"
        alignItems={{
          xs: "stretch",
          md: "center",
        }}
        spacing={2}
        mb={3}
      >
        <Typography variant="h4">
          Publisher Management
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={
            handleAddPublisher
          }
        >
          Add Publisher
        </Button>
      </Stack>

      <TextField
        fullWidth
        label="Search Publishers"
        value={searchText}
        onChange={(event) =>
          setSearchText(
            event.target.value
          )
        }
        sx={{ mb: 3 }}
      />

      <Grid
        container
        spacing={3}
      >
        {filteredPublishers.map(
          (publisher) => (
            <Grid
              size={{
                xs: 12,
                sm: 6,
                lg: 4,
              }}
              key={publisher.id}
            >
              <PublisherManagementCard
                publisher={publisher}
                onViewProfile={
                  handleViewProfile
                }
                onEdit={
                  handleEditPublisher
                }
                onArchive={
                  handleArchivePublisher
                }
              />
            </Grid>
          )
        )}
      </Grid>
    </Box>
  );
}