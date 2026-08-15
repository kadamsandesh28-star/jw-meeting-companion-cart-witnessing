import { useState } from "react";

import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";

import {
  Button,
} from "@mui/material";

import ExportMenu from "./ExportMenu";

interface Props {
  onPdf(): void;
}

export default function ExportButton({
  onPdf,
}: Props) {
  const [anchorEl, setAnchorEl] =
    useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleOpen = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<FileDownloadRoundedIcon />}
        onClick={handleOpen}
      >
        Export
      </Button>

      <ExportMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onPdf={onPdf}
      />
    </>
  );
}