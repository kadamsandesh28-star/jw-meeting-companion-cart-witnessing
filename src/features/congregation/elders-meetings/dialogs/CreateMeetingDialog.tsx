import { useState } from "react";

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

interface Props {
  open: boolean;
  onClose(): void;
  onCreate(data: {
    title: string;
    meetingType: string;
    meetingDate: string;
    meetingTime: string;
  }): void;
}

export default function CreateMeetingDialog({
  open,
  onClose,
  onCreate,
}: Props) {
  const [title, setTitle] = useState(
    "Monthly Body of Elders Meeting"
  );

  const [meetingType, setMeetingType] =
    useState("Body of Elders");

  const [meetingDate, setMeetingDate] =
    useState(
      new Date()
        .toISOString()
        .split("T")[0]
    );

  const [meetingTime, setMeetingTime] =
    useState("19:00");

  const handleCreate = () => {
    onCreate({
      title,
      meetingType,
      meetingDate,
      meetingTime,
    });

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
        Create Meeting
      </DialogTitle>

      <DialogContent>
        <Stack
          spacing={3}
          sx={{ mt: 1 }}
        >
          <TextField
            label="Meeting Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            fullWidth
          />

          <TextField
            select
            label="Meeting Type"
            value={meetingType}
            onChange={(e) =>
              setMeetingType(e.target.value)
            }
            fullWidth
          >
            <MenuItem value="Body of Elders">
              Body of Elders
            </MenuItem>

            <MenuItem value="Service Committee">
              Service Committee
            </MenuItem>

            <MenuItem value="Other">
              Other Meeting
            </MenuItem>
          </TextField>

          <TextField
            type="date"
            label="Meeting Date"
            value={meetingDate}
            onChange={(e) =>
              setMeetingDate(e.target.value)
            }
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            type="time"
            label="Meeting Time"
            value={meetingTime}
            onChange={(e) =>
              setMeetingTime(e.target.value)
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleCreate}
        >
          Create Meeting
        </Button>
      </DialogActions>
    </Dialog>
  );
}