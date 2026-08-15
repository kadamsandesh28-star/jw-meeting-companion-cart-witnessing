import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import PrintRoundedIcon from "@mui/icons-material/PrintRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import DataObjectRoundedIcon from "@mui/icons-material/DataObjectRounded";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";

import {
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";

interface Props {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose(): void;
  onPdf(): void;
}

export default function ExportMenu({
  anchorEl,
  open,
  onClose,
  onPdf,
}: Props) {
  const handlePdf = () => {
    onPdf();
    onClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <MenuItem onClick={handlePdf}>
        <ListItemIcon>
          <PictureAsPdfRoundedIcon color="error" />
        </ListItemIcon>

        <ListItemText>
          Export PDF
        </ListItemText>
      </MenuItem>

      <MenuItem disabled>
        <ListItemIcon>
          <PrintRoundedIcon />
        </ListItemIcon>

        <ListItemText>
          Print
        </ListItemText>
      </MenuItem>

      <Divider />

      <MenuItem disabled>
        <ListItemIcon>
          <DescriptionRoundedIcon />
        </ListItemIcon>

        <ListItemText>
          Export Word (.docx)
        </ListItemText>
      </MenuItem>

      <MenuItem disabled>
        <ListItemIcon>
          <DataObjectRoundedIcon />
        </ListItemIcon>

        <ListItemText>
          Export JSON
        </ListItemText>
      </MenuItem>

      <MenuItem disabled>
        <ListItemIcon>
          <NotesRoundedIcon />
        </ListItemIcon>

        <ListItemText>
          Export Markdown
        </ListItemText>
      </MenuItem>
    </Menu>
  );
}