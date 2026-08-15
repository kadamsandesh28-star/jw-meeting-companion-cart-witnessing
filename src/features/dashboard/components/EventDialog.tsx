import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";

import {
  DashboardEvent,
  EventCategory,
} from "../models/DashboardEvent";

interface EventDialogProps {
  open: boolean;
  initialDate: string;
  event?: DashboardEvent;
  onClose: () => void;

  onSave: (
    event:
      | Omit<DashboardEvent, "id">
      | DashboardEvent
  ) => void;

  onDelete?: (id: string) => void;
}

const categories: EventCategory[] = [
  "Meeting",
  "Assembly",
  "Convention",
  "Personal",
  "Reminder",
];

export default function EventDialog({
  open,
  initialDate,
  event,
  onClose,
  onSave,
  onDelete,
}: EventDialogProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState("19:00");
  const [category, setCategory] =
    useState<EventCategory>("Meeting");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDate(event.date);
      setTime(event.time ?? "19:00");
      setCategory(event.category);
      setNotes(event.notes ?? "");
    } else {
      setTitle("");
      setDate(initialDate);
      setTime("19:00");
      setCategory("Meeting");
      setNotes("");
    }
  }, [event, initialDate, open]);

  const handleSave = () => {
    if (!title.trim()) return;

    const payload = {
      title: title.trim(),
      date,
      time,
      category,
      notes,
    };

    if (event) {
      onSave({
        ...event,
        ...payload,
      });
    } else {
      onSave(payload);
    }

    onClose();
  };

  const handleDelete = () => {
    if (!event || !onDelete) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) {
      return;
    }

    onDelete(event.id);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {event ? "Edit Event" : "Add Event"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} mt={1}>
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <TextField
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
          />

          <TextField
            label="Time"
            type="time"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300,
            }}
            value={time}
            onChange={(e) =>
              setTime(e.target.value)
            }
          />

          <TextField
            select
            label="Category"
            fullWidth
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value as EventCategory
              )
            }
          >
            {categories.map((cat) => (
              <MenuItem
                key={cat}
                value={cat}
              >
                {cat}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Notes"
            multiline
            rows={4}
            fullWidth
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
          />
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{
          justifyContent: "space-between",
          px: 3,
          pb: 2,
        }}
      >
        <div>
          {event && (
            <Button
              color="error"
              onClick={handleDelete}
            >
              Delete
            </Button>
          )}
        </div>

        <Stack
          direction="row"
          spacing={1}
        >
          <Button onClick={onClose}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
          >
            Save
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}