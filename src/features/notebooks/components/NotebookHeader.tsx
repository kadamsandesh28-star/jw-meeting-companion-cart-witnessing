import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";

import {
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { Notebook } from "../models/Notebook";

interface Props {
  notebook: Notebook;
  onBack: () => void;
}

export default function NotebookHeader({
  notebook,
  onBack,
}: Props) {
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
        <Button
          startIcon={<ArrowBackRoundedIcon />}
          onClick={onBack}
          sx={{
            alignSelf: "flex-start",
          }}
        >
          Back
        </Button>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
        >
          <AutoStoriesRoundedIcon
            color="primary"
            sx={{
              fontSize: 42,
            }}
          />

          <div>
            <Typography
              variant="h4"
              fontWeight={700}
            >
              {notebook.title}
            </Typography>

            <Chip
              label={notebook.type}
              color="primary"
              size="small"
              sx={{ mt: 1 }}
            />
          </div>
        </Stack>
      </Stack>
    </Paper>
  );
}