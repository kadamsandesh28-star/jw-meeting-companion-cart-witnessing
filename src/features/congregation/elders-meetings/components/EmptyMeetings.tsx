import EventBusyRoundedIcon from "@mui/icons-material/EventBusyRounded";

import {
  Avatar,
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";

export default function EmptyMeetings() {
  return (
    <Box
      sx={{
        py: 8,
        textAlign: "center",
      }}
    >
      <Stack
        spacing={3}
        alignItems="center"
      >
        <Avatar
          sx={{
            width: 72,
            height: 72,
            bgcolor: "#E3F2FD",
            color: "primary.main",
          }}
        >
          <EventBusyRoundedIcon
            fontSize="large"
          />
        </Avatar>

        <Stack spacing={1}>
          <Typography
            variant="h5"
            fontWeight={700}
          >
            No Meetings Yet
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              maxWidth: 500,
            }}
          >
            Create your first Body of Elders meeting to
            begin managing agendas, attendance,
            assignments and meeting minutes.
          </Typography>
        </Stack>

        <Button
          variant="contained"
          size="large"
        >
          Create First Meeting
        </Button>
      </Stack>
    </Box>
  );
}