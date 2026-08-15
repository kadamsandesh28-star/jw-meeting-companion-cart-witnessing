import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import { WorshipTemplate } from "../models/WorshipTemplate";

interface Props {
  open: boolean;
  template: WorshipTemplate | null;
  onClose: () => void;
  onUse: (template: WorshipTemplate) => void;
}

export default function TemplatePreviewDialog({
  open,
  template,
  onClose,
  onUse,
}: Props) {
  if (!template) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
        >
          <Typography fontSize={34}>
            {template.icon}
          </Typography>

          <Stack>
            <Typography
              variant="h5"
              fontWeight={700}
            >
              {template.name}
            </Typography>

            <Typography
              color="text.secondary"
            >
              {template.description}
            </Typography>
          </Stack>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3}>
          <Chip
            label={template.category}
            color="primary"
            sx={{ width: "fit-content" }}
          />

          <Divider />

          <Stack spacing={1}>
            <Typography
              fontWeight={700}
            >
              Theme
            </Typography>

            <Typography>
              {template.theme}
            </Typography>
          </Stack>

          <Stack spacing={1}>
            <Typography
              fontWeight={700}
            >
              Bible Reading
            </Typography>

            <Typography>
              {template.bibleReading}
            </Typography>
          </Stack>

          <Divider />

          <Stack spacing={1}>
            <Typography
              fontWeight={700}
            >
              Discussion Questions
            </Typography>

            {template.discussionQuestions.map(
              (question, index) => (
                <Typography key={index}>
                  • {question}
                </Typography>
              )
            )}
          </Stack>

          <Divider />

          <Stack spacing={1}>
            <Typography
              fontWeight={700}
            >
              Family Goals
            </Typography>

            {template.defaultGoals.map(
              (goal, index) => (
                <Typography key={index}>
                  ✓ {goal}
                </Typography>
              )
            )}
          </Stack>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={() =>
            onUse(template)
          }
        >
          Use Template
        </Button>
      </DialogActions>
    </Dialog>
  );
}