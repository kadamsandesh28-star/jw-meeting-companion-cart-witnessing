import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

export default function RecentActivityCard() {
  function handleViewAll() {
    // TODO:
    // Navigate to Activity History page
    // Example:
    // navigate("/congregation/activity-history");
  }

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardContent
        sx={{
          p: 4,
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
        >
          <Avatar
            sx={{
              width: 58,
              height: 58,
              bgcolor: "#E3F2FD",
              color: "primary.main",
            }}
          >
            <HistoryRoundedIcon />
          </Avatar>

          <Box flex={1}>
            <Typography
              variant="h5"
              fontWeight={700}
            >
              Recent Activity
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              Latest updates across your congregation.
            </Typography>
          </Box>

          <Button
            variant="outlined"
            endIcon={<ChevronRightRoundedIcon />}
            onClick={handleViewAll}
            sx={{
              borderRadius: 3,
              px: 3,
              py: 1,
              fontWeight: 700,
            }}
          >
            View All Activity
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}