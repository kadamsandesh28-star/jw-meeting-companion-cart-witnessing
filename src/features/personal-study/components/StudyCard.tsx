import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import {
  Box,
  Chip,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Study } from "../models/Study";

interface StudyCardProps {
  study: Study;
  onToggleFavorite?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function StudyCard({
  study,
  onToggleFavorite,
  onDelete,
}: StudyCardProps) {
  const navigate = useNavigate();

  const updated = new Date(
    study.updatedAt
  ).toLocaleDateString();

  const handleOpenStudy = () => {
    navigate(`/personal/personal-study/${study.id}`);
  };

  return (
    <Paper
      elevation={0}
      onClick={handleOpenStudy}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        transition: "0.2s",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 3,
        },
      }}
    >
      <Stack spacing={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              fontWeight={700}
            >
              {study.title}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              {study.description || "No description yet."}
            </Typography>
          </Box>

          <Stack direction="row" spacing={0.5}>
            <Tooltip title="Delete Study">
              <IconButton
                color="error"
                onClick={(event) => {
                  event.stopPropagation();
                  onDelete?.(study.id);
                }}
              >
                <DeleteOutlineRoundedIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Favorite">
              <IconButton
                onClick={(event) => {
                  event.stopPropagation();
                  onToggleFavorite?.(study.id);
                }}
              >
                {study.favorite ? (
                  <StarRoundedIcon color="warning" />
                ) : (
                  <StarBorderRoundedIcon />
                )}
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
        >
          <Chip
            label={study.type}
            color="primary"
            size="small"
          />

          {study.archived && (
            <Chip
              label="Archived"
              color="default"
              size="small"
            />
          )}
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <AccessTimeRoundedIcon
              fontSize="small"
              color="action"
            />

            <Typography
              variant="caption"
              color="text.secondary"
            >
              Updated {updated}
            </Typography>
          </Stack>

          <ArrowForwardRoundedIcon color="action" />
        </Stack>
      </Stack>
    </Paper>
  );
}