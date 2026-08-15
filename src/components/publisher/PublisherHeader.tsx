import {
  Avatar,
  Box,
  Button,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { Publisher } from "../../features/congregation/publishers/models/Publisher";

interface PublisherHeaderProps {
  publisher: Publisher;
  onEdit?: () => void;
}

export default function PublisherHeader({
  publisher,
  onEdit,
}: PublisherHeaderProps) {
  const initials = `${publisher.firstName.charAt(0)}${publisher.lastName.charAt(
    0
  )}`.toUpperCase();

  const fullName =
  `${publisher.firstName} ${publisher.lastName}`.trim();

  return (
    <Box
      sx={{
        mb: 3,
        p: 3,
        borderRadius: 3,
        bgcolor: "background.paper",
        boxShadow: 2,
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        alignItems={{ xs: "flex-start", md: "center" }}
      >
        <Avatar
          src={publisher.photoUrl}
          sx={{
            width: 88,
            height: 88,
            bgcolor: "primary.main",
            fontSize: 32,
            fontWeight: 700,
          }}
        >
          {!publisher.photoUrl && initials}
        </Avatar>

        <Box flex={1}>
          <Typography variant="h4" fontWeight={700}>
            {fullName}
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            {publisher.publisherStatus}
          </Typography>

          <Typography color="text.secondary">
            Service Group: {publisher.congregationGroup}
          </Typography>

          <Typography color="text.secondary">
            📞 {publisher.mobile || publisher.phone || "No phone"}
          </Typography>

          <Typography color="text.secondary">
            ✉ {publisher.email || "No email"}
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            useFlexGap
            sx={{ mt: 2 }}
          >
            {publisher.privileges.map((privilege) => (
              <Chip
                key={privilege.id}
                label={privilege.type}
                size="small"
                color="secondary"
              />
            ))}
          </Stack>
        </Box>

        <Stack spacing={1}>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={onEdit}
          >
            Edit
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}