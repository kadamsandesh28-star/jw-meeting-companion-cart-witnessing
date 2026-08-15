import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useNavigate } from "react-router-dom";

import { usePublishers } from "../hooks/usePublishers";
import PublisherSearch from "../components/PublisherSearch";
import PublisherTable from "../components/PublisherTable";
import StatsCards from "../components/StatsCards";

export default function PublisherList() {
  const navigate = useNavigate();

  const {
    publishers,
    search,
    setSearch,
  } = usePublishers();

  const handleAddPublisher = () => {
    navigate("/congregation/publishers/new");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
        >
          Publisher Management
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddPublisher}
        >
          Add Publisher
        </Button>
      </Stack>

      <StatsCards publishers={publishers} />

      <Paper sx={{ mt: 3, p: 3 }}>
        <PublisherSearch
          value={search}
          onChange={setSearch}
        />

        <PublisherTable publishers={publishers} />
      </Paper>
    </Box>
  );
}