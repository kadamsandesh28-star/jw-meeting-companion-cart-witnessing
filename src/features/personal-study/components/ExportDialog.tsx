import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import PrintRoundedIcon from "@mui/icons-material/PrintRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import TextSnippetRoundedIcon from "@mui/icons-material/TextSnippetRounded";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

interface ExportDialogProps {
  open: boolean;
  onClose: () => void;

  onExportPdf: () => void;
  onExportWord: () => void;
  onSharePdf: () => void;
  onExportMarkdown: () => void;
  onExportText: () => void;
  onPrint: () => void;
}

export default function ExportDialog({
  open,
  onClose,
  onExportPdf,
  onExportWord,
  onSharePdf,
  onExportMarkdown,
  onExportText,
  onPrint,
}: ExportDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>
        Export Study
      </DialogTitle>

      <DialogContent dividers>
        <List disablePadding>

          <ListItemButton
            onClick={() => {
              onExportPdf();
              onClose();
            }}
          >
            <ListItemIcon>
              <PictureAsPdfRoundedIcon color="error" />
            </ListItemIcon>

            <ListItemText
              primary="Export as PDF"
              secondary="Save a professional PDF document."
            />
          </ListItemButton>

          <Divider />

          <ListItemButton
            onClick={() => {
              onExportWord();
              onClose();
            }}
          >
            <ListItemIcon>
              <DescriptionRoundedIcon color="primary" />
            </ListItemIcon>

            <ListItemText
              primary="Export as Word (.docx)"
              secondary="Open in Microsoft Word or LibreOffice."
            />
          </ListItemButton>

          <Divider />

          <ListItemButton
            onClick={() => {
              onExportMarkdown();
              onClose();
            }}
          >
            <ListItemIcon>
              <TextSnippetRoundedIcon color="success" />
            </ListItemIcon>

            <ListItemText
              primary="Export as Markdown"
              secondary="Perfect for Obsidian, GitHub and notes."
            />
          </ListItemButton>

          <Divider />

          <ListItemButton
            onClick={() => {
              onExportText();
              onClose();
            }}
          >
            <ListItemIcon>
              <TextSnippetRoundedIcon />
            </ListItemIcon>

            <ListItemText
              primary="Export as Text (.txt)"
              secondary="Simple plain text document."
            />
          </ListItemButton>

          <Divider />

          <ListItemButton
            onClick={() => {
              onSharePdf();
              onClose();
            }}
          >
            <ListItemIcon>
              <ShareRoundedIcon color="primary" />
            </ListItemIcon>

            <ListItemText
              primary="Share PDF"
              secondary="Share using your device."
            />
          </ListItemButton>

          <Divider />

          <ListItemButton
            onClick={() => {
              onPrint();
              onClose();
            }}
          >
            <ListItemIcon>
              <PrintRoundedIcon color="action" />
            </ListItemIcon>

            <ListItemText
              primary="Print"
              secondary="Print your study notebook."
            />
          </ListItemButton>

        </List>
      </DialogContent>

      <DialogActions>
        <Button
          startIcon={<DownloadRoundedIcon />}
          onClick={onClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}