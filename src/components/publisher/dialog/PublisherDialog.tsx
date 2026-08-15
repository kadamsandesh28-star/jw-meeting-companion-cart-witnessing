import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { useEffect, useState } from "react";

import { Publisher } from "../../../features/congregation/publishers/models/Publisher";
import PublisherForm from "../form/PublisherForm";

interface PublisherDialogProps {
  open: boolean;
  publisher: Publisher;
  title: string;
  onClose: () => void;
  onSave: (publisher: Publisher) => void;
  onArchive?: (publisher: Publisher) => void;
}

export default function PublisherDialog({
  open,
  publisher,
  title,
  onClose,
  onSave,
  onArchive,
}: PublisherDialogProps) {
  const theme = useTheme();

  const fullScreen = useMediaQuery(
    theme.breakpoints.down("sm")
  );

  const [currentPublisher, setCurrentPublisher] =
    useState<Publisher>(publisher);

  useEffect(() => {
    setCurrentPublisher(publisher);
  }, [publisher]);

  const existingPublisher =
    currentPublisher.id.trim().length > 0;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      fullWidth
      maxWidth="md"
      scroll="paper"
      PaperProps={{
        sx: {
          borderRadius: {
            xs: 0,
            sm: 3,
          },
          maxHeight: "95vh",
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>

      <DialogContent
        dividers
        sx={{
          p: {
            xs: 2,
            sm: 3,
          },
          overflowY: "auto",
        }}
      >
        <PublisherForm
          value={currentPublisher}
          onChange={setCurrentPublisher}
        />
      </DialogContent>

      <DialogActions
        sx={{
          p: 2,
          gap: 1,
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {existingPublisher && onArchive && (
          <Button
            color="warning"
            onClick={() =>
              onArchive(currentPublisher)
            }
          >
            Archive
          </Button>
        )}

        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={() =>
            onSave(currentPublisher)
          }
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}