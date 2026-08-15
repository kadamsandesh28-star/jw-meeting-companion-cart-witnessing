import {
  Box,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { NotebookTemplate } from "../models/NotebookTemplate";

interface NotebookTemplateCardProps {
  template: NotebookTemplate;
  onClick: (template: NotebookTemplate) => void;
}

export default function NotebookTemplateCard({
  template,
  onClick,
}: NotebookTemplateCardProps) {
  return (
    <Paper
      elevation={0}
      onClick={() => onClick(template)}
      sx={{
        p: 3,
        borderRadius: 3,
        cursor: "pointer",
        border: "1px solid",
        borderColor: "divider",
        transition: ".2s",

        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
    >
      <Stack spacing={2}>
        <Typography
          fontSize={42}
        >
          {template.icon}
        </Typography>

        <Typography
          variant="h6"
          fontWeight={700}
        >
          {template.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          {template.description}
        </Typography>

        <Box
          sx={{
            height: 5,
            borderRadius: 5,
            bgcolor: template.color,
            mt: 2,
          }}
        />
      </Stack>
    </Paper>
  );
}