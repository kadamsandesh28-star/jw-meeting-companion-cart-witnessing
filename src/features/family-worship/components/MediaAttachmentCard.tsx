import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import MovieRoundedIcon from "@mui/icons-material/MovieRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

import {
  Box,
  Button,
  Chip,
  IconButton,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  MediaAttachment,
  MediaType,
} from "../models/MediaAttachment";



import {
  launchMedia,
  openInBrowser,
} from "../../../shared/utils/mediaLauncher";

interface Props {
  attachment: MediaAttachment;
  onEdit?: (attachment: MediaAttachment) => void;
  onDelete?: (id: string) => void;
}

function getIcon(type: MediaType) {
  switch (type) {
    case "video":
      return (
        <MovieRoundedIcon color="error" />
      );

    case "image":
      return (
        <ImageRoundedIcon color="primary" />
      );

    case "document":
      return (
        <DescriptionRoundedIcon color="warning" />
      );

    case "link":
      return (
        <LinkRoundedIcon color="success" />
      );

    default:
      return (
        <LinkRoundedIcon color="action" />
      );
  }
}

export default function MediaAttachmentCard({
  attachment,
  onEdit,
  onDelete,
}: Props) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        border: 1,
        borderColor: "divider",
        transition: "all .2s ease",

        "&:hover": {
          boxShadow: 3,
        },
      }}
    >
      <Stack spacing={2}>
        <Stack
          direction="row"
          spacing={2}
          alignItems="flex-start"
        >
          <Box mt={0.5}>
            {getIcon(attachment.type)}
          </Box>

          <Box flex={1}>
            <Typography
              variant="h6"
              fontWeight={700}
            >
              {attachment.title}
            </Typography>

            <Chip
              label={attachment.type.toUpperCase()}
              size="small"
              sx={{
                mt: 1,
                mb: 2,
                fontWeight: 600,
              }}
            />

            <Link
              href={attachment.url}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              sx={{
                display: "block",
                wordBreak: "break-all",
              }}
            >
              {attachment.url}
            </Link>
          </Box>

          <Stack direction="row">
            <IconButton
              onClick={() =>
                onEdit?.(attachment)
              }
            >
              <EditRoundedIcon />
            </IconButton>

            <IconButton
              color="error"
              onClick={() =>
                onDelete?.(
                  attachment.id
                )
              }
            >
              <DeleteRoundedIcon />
            </IconButton>
          </Stack>
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          flexWrap="wrap"
        >
          <Button
            variant="contained"
            startIcon={
              <PlayArrowRoundedIcon />
            }
            onClick={() =>
              launchMedia(
                attachment.url
              )
            }
          >
            Play
          </Button>

          <Button
            variant="outlined"
            startIcon={
              <LaunchRoundedIcon />
            }
            onClick={() =>
              openInBrowser(
                attachment.url
              )
            }
          >
            Open
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}