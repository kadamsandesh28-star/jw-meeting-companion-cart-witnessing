import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import PushPinRoundedIcon from "@mui/icons-material/PushPinRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import {
  Box,
  Chip,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import { Notebook } from "../models/Notebook";

interface Props {
  notebook: Notebook;

  onFavorite: (id: string) => void;

  onPin: (id: string) => void;

  onDelete: () => void;
}

export default function NotebookCard({
  notebook,
  onFavorite,
  onPin,
  onDelete,
}: Props) {
  const navigate = useNavigate();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        cursor: "pointer",

        "&:hover": {
          boxShadow: 3,
        },
      }}
      onClick={() =>
        navigate(
          `/personal/notebooks/${notebook.id}`
        )
      }
    >
      <Stack spacing={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
        >
          <Box>
            <Typography
              variant="h6"
              fontWeight={700}
            >
              {notebook.title}
            </Typography>

            <Typography
              color="text.secondary"
            >
              {notebook.description}
            </Typography>
          </Box>

          <Stack direction="row">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onFavorite(
                  notebook.id
                );
              }}
            >
              {notebook.favorite ? (
                <StarRoundedIcon color="warning" />
              ) : (
                <StarBorderRoundedIcon />
              )}
            </IconButton>

            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onPin(
                  notebook.id
                );
              }}
            >
              <PushPinRoundedIcon
                color={
                  notebook.pinned
                    ? "primary"
                    : "inherit"
                }
              />
            </IconButton>

            <IconButton
              color="error"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <DeleteRoundedIcon />
            </IconButton>
          </Stack>
        </Stack>

        <Chip
          label={notebook.type}
          size="small"
          color="primary"
          sx={{
            width: "fit-content",
          }}
        />

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
        >
          <AccessTimeRoundedIcon fontSize="small" />

          <Typography variant="caption">
            Updated{" "}
            {new Date(
              notebook.updatedAt
            ).toLocaleDateString()}
          </Typography>

          <Box sx={{ flex: 1 }} />

          <ArrowForwardRoundedIcon />
        </Stack>
      </Stack>
    </Paper>
  );
}