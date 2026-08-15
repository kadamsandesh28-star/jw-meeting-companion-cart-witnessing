import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";

import {
  Card,
  CardActionArea,
  Chip,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import { WorshipTemplate } from "../models/WorshipTemplate";
import { useTemplateFavorites } from "../hooks/useTemplateFavorites";

interface Props {
  template: WorshipTemplate;
  onSelect?: (
    template: WorshipTemplate
  ) => void;
}

export default function TemplateCard({
  template,
  onSelect,
}: Props) {
  const {
    isFavorite,
    toggleFavorite,
  } = useTemplateFavorites();

  const favorite =
    isFavorite(template.id);

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: 4,
        border: 1,
        borderColor: "divider",
        transition:
          "all .25s ease",
        "&:hover": {
          borderColor: "primary.main",
          transform:
            "translateY(-4px)",
          boxShadow: 4,
        },
      }}
    >
      <CardActionArea
        sx={{
          p: 3,
          height: "100%",
        }}
        onClick={() =>
          onSelect?.(template)
        }
      >
        <Stack
          spacing={2}
          height="100%"
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Stack spacing={1}>
              <Typography
                fontSize={34}
              >
                {template.icon}
              </Typography>

              <Typography
                variant="h6"
                fontWeight={700}
              >
                {template.name}
              </Typography>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
            >
              <IconButton
                size="small"
                onClick={(event) => {
                  event.stopPropagation();
                  toggleFavorite(
                    template.id
                  );
                }}
              >
                {favorite ? (
                  <StarRoundedIcon
                    color="warning"
                  />
                ) : (
                  <StarBorderRoundedIcon />
                )}
              </IconButton>

              <ArrowForwardRoundedIcon
                color="action"
              />
            </Stack>
          </Stack>

          <Typography
            color="text.secondary"
            sx={{
              flexGrow: 1,
              minHeight: 48,
            }}
          >
            {template.description}
          </Typography>

          <Chip
            label={template.category}
            color="primary"
            size="small"
            sx={{
              width: "fit-content",
            }}
          />

          <Divider />

          <Stack spacing={1}>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <AutoStoriesRoundedIcon
                fontSize="small"
                color="primary"
              />

              <Typography
                variant="body2"
              >
                {template.bibleReading}
              </Typography>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <FlagRoundedIcon
                fontSize="small"
                color="success"
              />

              <Typography
                variant="body2"
              >
                {
                  template
                    .discussionQuestions
                    .length
                }{" "}
                Questions
              </Typography>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <StarRoundedIcon
                fontSize="small"
                color="warning"
              />

              <Typography
                variant="body2"
              >
                {
                  template.defaultGoals
                    .length
                }{" "}
                Goals
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardActionArea>
    </Card>
  );
}