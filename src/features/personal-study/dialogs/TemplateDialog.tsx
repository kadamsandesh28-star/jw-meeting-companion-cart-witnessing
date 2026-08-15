  import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  STUDY_TEMPLATES,
  StudyTemplate,
} from "../models/StudyTemplate";

interface TemplateDialogProps {
  open: boolean;
  onClose: () => void;
  onSelect: (template: StudyTemplate) => void;
}

export default function TemplateDialog({
  open,
  onClose,
  onSelect,
}: TemplateDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Choose a Study Template

        <IconButton onClick={onClose}>
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>
          {STUDY_TEMPLATES.map((template) => (
            <Grid
              key={template.id}
              size={{ xs: 12, sm: 6 }}
            >
              <Paper
                elevation={0}
                onClick={() => onSelect(template)}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  cursor: "pointer",
                  transition: "0.2s",
                  "&:hover": {
                    borderColor: "primary.main",
                    transform: "translateY(-3px)",
                    boxShadow: 3,
                  },
                }}
              >
                <Stack spacing={1}>
                  <Typography fontSize={36}>
                    {template.icon}
                  </Typography>

                  <Typography
                    variant="h6"
                    fontWeight={700}
                  >
                    {template.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {template.description}
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}  