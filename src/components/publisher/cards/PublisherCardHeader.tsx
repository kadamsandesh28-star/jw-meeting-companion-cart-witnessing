import {
  Avatar,
  Box,
  Stack,
  Typography,
} from "@mui/material";

import { Publisher } from "../../../features/congregation/publishers/models/Publisher";

interface PublisherCardHeaderProps {
  publisher: Publisher;
}

export default function PublisherCardHeader({
  publisher,
}: PublisherCardHeaderProps) {
  const initials = `${publisher.firstName.charAt(0)}${publisher.lastName.charAt(
    0
  )}`.toUpperCase();

  const fullName = `${publisher.firstName} ${publisher.lastName}`.trim();

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
    >
      <Avatar
        src={publisher.photoUrl}
        sx={{
          width: 64,
          height: 64,
          bgcolor: "primary.main",
          fontWeight: 700,
          fontSize: 24,
          flexShrink: 0,
        }}
      >
        {!publisher.photoUrl && initials}
      </Avatar>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{
            lineHeight: 1.2,
            wordBreak: "break-word",
          }}
        >
          {fullName}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          {publisher.publisherStatus}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          Service Group {publisher.congregationGroup}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          📞 {publisher.mobile || publisher.phone || "No phone"}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          ✉ {publisher.email || "No email"}
        </Typography>
      </Box>
    </Stack>
  );
}