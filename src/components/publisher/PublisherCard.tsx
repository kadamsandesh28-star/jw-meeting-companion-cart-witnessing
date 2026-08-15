import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import PublisherHeader from "./PublisherHeader";

import { Publisher } from "../../features/congregation/publishers/models/Publisher";

interface PublisherCardProps {
  publisher: Publisher;
  onViewProfile?: (publisherId: string) => void;
}

export default function PublisherCard({
  publisher,
  onViewProfile,
}: PublisherCardProps) {
  return (
    <Card
      elevation={2}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <PublisherHeader publisher={publisher} />

        <Divider sx={{ my: 2 }} />

        <Stack spacing={2}>
          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            useFlexGap
          >
            <Chip
              size="small"
              color={publisher.active ? "success" : "default"}
              label={publisher.active ? "Active" : "Inactive"}
            />

            <Chip
              size="small"
              color={publisher.baptized ? "primary" : "default"}
              label={
                publisher.baptized
                  ? "Baptized"
                  : "Unbaptized"
              }
            />
          </Stack>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            <strong>Assignments:</strong>{" "}
            {publisher.assignments.length}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            <strong>Privileges:</strong>{" "}
            {publisher.privileges.length}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            <strong>Family Members:</strong>{" "}
            {publisher.family.length}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            <strong>Timeline Events:</strong>{" "}
            {publisher.timeline.length}
          </Typography>
        </Stack>
      </CardContent>

      <CardActions
        sx={{
          justifyContent: "flex-end",
          px: 2,
          pb: 2,
        }}
      >
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={() =>
            onViewProfile?.(publisher.id)
          }
        >
          View Profile
        </Button>
      </CardActions>
    </Card>
  );
}