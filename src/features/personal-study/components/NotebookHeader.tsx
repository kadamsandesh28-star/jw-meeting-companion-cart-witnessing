import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import BookRoundedIcon from "@mui/icons-material/BookRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import {
  Button,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { Study } from "../models/Study";

interface NotebookHeaderProps {
  study: Study;
  onBack: () => void;
  onExport: () => void;
}

export default function NotebookHeader({
  study,
  onBack,
  onExport,
}: NotebookHeaderProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack spacing={3}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Button
            startIcon={<ArrowBackRoundedIcon />}
            onClick={onBack}
          >
            Back to Studies
          </Button>

          <Button
            variant="contained"
            startIcon={<DownloadRoundedIcon />}
            onClick={onExport}
          >
            Export
          </Button>
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
        >
          <BookRoundedIcon
            color="primary"
            sx={{ fontSize: 40 }}
          />

          <div>
            <Typography
              variant="h4"
              fontWeight={700}
            >
              {study.title}
            </Typography>

            <Typography color="text.secondary">
              {study.type}
            </Typography>
          </div>
        </Stack>
      </Stack>
    </Paper>
  );
}