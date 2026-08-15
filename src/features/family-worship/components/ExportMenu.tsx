import { useState } from "react";

import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import PrintRoundedIcon from "@mui/icons-material/PrintRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";

import {
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";

interface Props {
  onPdf: () => void;
  onPrint: () => void;
  onCopy: () => void;
  onShare: () => void;
}

export default function ExportMenu({
  onPdf,
  onPrint,
  onCopy,
  onShare,
}: Props) {
  const [anchorEl, setAnchorEl] =
    useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  function openMenu(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    setAnchorEl(event.currentTarget);
  }

  function closeMenu() {
    setAnchorEl(null);
  }

  function handleAction(
    action: () => void
  ) {
    closeMenu();
    action();
  }

  return (
    <>
      <Button
        variant="outlined"
        endIcon={
          <ExpandMoreRoundedIcon />
        }
        onClick={openMenu}
        aria-controls={
          open
            ? "export-menu"
            : undefined
        }
        aria-haspopup="true"
        aria-expanded={
          open
            ? "true"
            : undefined
        }
      >
        Export
      </Button>

      <Menu
        id="export-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
      >
        <MenuItem
          onClick={() =>
            handleAction(onPdf)
          }
        >
          <ListItemIcon>
            <FileDownloadRoundedIcon
              fontSize="small"
            />
          </ListItemIcon>

          <ListItemText>
            Export PDF
          </ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() =>
            handleAction(onPrint)
          }
        >
          <ListItemIcon>
            <PrintRoundedIcon
              fontSize="small"
            />
          </ListItemIcon>

          <ListItemText>
            Print
          </ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() =>
            handleAction(onCopy)
          }
        >
          <ListItemIcon>
            <ContentCopyRoundedIcon
              fontSize="small"
            />
          </ListItemIcon>

          <ListItemText>
            Copy
          </ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() =>
            handleAction(onShare)
          }
        >
          <ListItemIcon>
            <ShareRoundedIcon
              fontSize="small"
            />
          </ListItemIcon>

          <ListItemText>
            Share
          </ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}