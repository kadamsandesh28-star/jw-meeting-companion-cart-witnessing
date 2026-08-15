import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import PrintRoundedIcon from "@mui/icons-material/PrintRounded";

import {
  Button,
  Stack,
} from "@mui/material";

interface Props {
  onSave: () => void;
  onExport: () => void;
  onPrint?: () => void;
}

export default function ScheduleToolbar({
  onSave,
  onExport,
  onPrint,
}: Props) {
  return (
    <Stack
      direction="row"
      spacing={2}
      flexWrap="wrap"
    >
      <Button
        variant="contained"
        color="success"
        startIcon={<SaveRoundedIcon />}
        onClick={onSave}
      >
        Save Schedule
      </Button>

      <Button
        variant="outlined"
        color="success"
        startIcon={<PictureAsPdfRoundedIcon />}
        onClick={onExport}
      >
        Export PDF
      </Button>

      <Button
        variant="outlined"
        color="success"
        startIcon={<PrintRoundedIcon />}
        onClick={
          onPrint ??
          (() => window.print())
        }
      >
        Print
      </Button>
    </Stack>
  );
}