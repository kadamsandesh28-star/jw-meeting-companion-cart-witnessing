import { useState } from "react";

import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { Button } from "@mui/material";

import ExportDialog from "./ExportDialog";

interface ExportButtonProps {
  onExportPdf: () => Promise<void> | void;
  onExportWord: () => Promise<void> | void;
  onSharePdf: () => Promise<void> | void;
  onExportMarkdown: () => Promise<void> | void;
  onExportText: () => Promise<void> | void;
  onPrint: () => Promise<void> | void;
}

export default function ExportButton({
  onExportPdf,
  onExportWord,
  onSharePdf,
  onExportMarkdown,
  onExportText,
  onPrint,
}: ExportButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        startIcon={<DownloadRoundedIcon />}
        onClick={() => setOpen(true)}
      >
        Export
      </Button>

      <ExportDialog
        open={open}
        onClose={() => setOpen(false)}
        onExportPdf={onExportPdf}
        onExportWord={onExportWord}
        onSharePdf={onSharePdf}
        onExportMarkdown={onExportMarkdown}
        onExportText={onExportText}
        onPrint={onPrint}
      />
    </>
  );
}