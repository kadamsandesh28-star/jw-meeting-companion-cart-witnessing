import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import ArchiveRoundedIcon from "@mui/icons-material/ArchiveRounded";

import {
  Button,
  Stack,
} from "@mui/material";

export default function MeetingFooter() {
  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="flex-end"
      mt={4}
    >
      <Button
        variant="outlined"
        startIcon={<ArchiveRoundedIcon />}
      >
        Archive
      </Button>

      <Button
        variant="outlined"
        startIcon={<PictureAsPdfRoundedIcon />}
      >
        Export PDF
      </Button>

      <Button
        variant="contained"
        startIcon={<SaveRoundedIcon />}
      >
        Save Meeting
      </Button>
    </Stack>
  );
}