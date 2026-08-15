import { useState } from "react";

import AddRoundedIcon from "@mui/icons-material/AddRounded";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  MediaAttachment,
  MediaType,
} from "../models/MediaAttachment";
import MediaAttachmentCard from "./MediaAttachmentCard";

interface Props {
  value: MediaAttachment[];
  onChange: (
    attachments: MediaAttachment[]
  ) => void;
}

const mediaTypes: MediaType[] = [
  "video",
  "image",
  "document",
  "link",
];

export default function MediaAttachmentsEditor({
  value,
  onChange,
}: Props) {
  const [open, setOpen] =
    useState(false);

  const [title, setTitle] =
    useState("");

  const [url, setUrl] =
    useState("");

  const [type, setType] =
    useState<MediaType>("video");

  const [
    editingAttachment,
    setEditingAttachment,
  ] =
    useState<MediaAttachment | null>(
      null
    );

  function resetForm() {
    setTitle("");
    setUrl("");
    setType("video");
    setEditingAttachment(null);
  }

  function handleEdit(
    attachment: MediaAttachment
  ) {
    setEditingAttachment(
      attachment
    );

    setTitle(attachment.title);
    setUrl(attachment.url);
    setType(attachment.type);

    setOpen(true);
  }

  function handleSave() {
    if (!title.trim() || !url.trim()) {
      return;
    }

    if (editingAttachment) {
      onChange(
        value.map((item) =>
          item.id ===
          editingAttachment.id
            ? {
                ...item,
                title,
                url,
                type,
              }
            : item
        )
      );
    } else {
      onChange([
        ...value,
        {
          id: crypto.randomUUID(),
          title,
          url,
          type,
        },
      ]);
    }

    resetForm();
    setOpen(false);
  }

  function handleDelete(id: string) {
    onChange(
      value.filter(
        (item) => item.id !== id
      )
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        border: 1,
        borderColor: "divider",
        borderRadius: 4,
      }}
    >
      <Stack spacing={3}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="h6"
            fontWeight={700}
          >
            Media
          </Typography>

          <Button
            variant="contained"
            startIcon={
              <AddRoundedIcon />
            }
            onClick={() => {
              resetForm();
              setOpen(true);
            }}
          >
            Add
          </Button>
        </Stack>

        {value.length === 0 ? (
          <Typography color="text.secondary">
            No media attached yet.
          </Typography>
        ) : (
          <Stack spacing={2}>
            {value.map(
              (attachment) => (
                <MediaAttachmentCard
                  key={attachment.id}
                  attachment={
                    attachment
                  }
                  onEdit={
                    handleEdit
                  }
                  onDelete={
                    handleDelete
                  }
                />
              )
            )}
          </Stack>
        )}
      </Stack>

      <Dialog
        open={open}
        onClose={() => {
          resetForm();
          setOpen(false);
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editingAttachment
            ? "Edit Media"
            : "Add Media"}
        </DialogTitle>

        <DialogContent>
          <Stack
            spacing={2}
            sx={{ mt: 1 }}
          >
            <TextField
              label="Title"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              fullWidth
            />

            <TextField
              select
              label="Type"
              value={type}
              onChange={(e) =>
                setType(
                  e.target
                    .value as MediaType
                )
              }
              fullWidth
            >
              {mediaTypes.map((item) => (
                <MenuItem
                  key={item}
                  value={item}
                >
                  {item}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="URL"
              value={url}
              onChange={(e) =>
                setUrl(
                  e.target.value
                )
              }
              fullWidth
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              resetForm();
              setOpen(false);
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
          >
            {editingAttachment
              ? "Save Changes"
              : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}