import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

import {
  AssignmentStatus,
  DepartmentAssignment,
} from "../models/DepartmentAssignment";
import { DepartmentWorkTemplate } from "../models/DepartmentWorkTemplate";
import { Publisher } from "../../publishers/types/Publisher";

interface AssignmentDialogProps {
  open: boolean;
  title: string;

  assignment?: DepartmentAssignment;

  templates: DepartmentWorkTemplate[];
  publishers: Publisher[];

  onClose: () => void;

  onSave: (data: {
    date: string;
    workTemplateId: string;
    assignedPublisherId?: string;
    location?: string;
    status: AssignmentStatus;
    notes?: string;
  }) => void;
}

export default function AssignmentDialog({
  open,
  title,
  assignment,
  templates,
  publishers,
  onClose,
  onSave,
}: AssignmentDialogProps) {
  const [date, setDate] = useState("");
  const [workTemplateId, setWorkTemplateId] =
    useState("");
  const [assignedPublisherId, setAssignedPublisherId] =
    useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] =
    useState<AssignmentStatus>("Pending");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!open) return;

    setDate(assignment?.date ?? "");
    setWorkTemplateId(
      assignment?.workTemplateId ?? ""
    );
    setAssignedPublisherId(
      assignment?.assignedPublisherId ?? ""
    );
    setLocation(assignment?.location ?? "");
    setStatus(assignment?.status ?? "Pending");
    setNotes(assignment?.notes ?? "");
  }, [assignment, open]);

  const handleTemplateChange = (
    templateId: string
  ) => {
    setWorkTemplateId(templateId);

    const template = templates.find(
      (t) => t.id === templateId
    );

    if (template) {
      setLocation(template.defaultLocation ?? "");
    }
  };

  const handleSave = () => {
    if (!date || !workTemplateId) {
      return;
    }

    onSave({
      date,
      workTemplateId,
      assignedPublisherId:
        assignedPublisherId || undefined,
      location: location || undefined,
      status,
      notes: notes || undefined,
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
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>Work</InputLabel>

            <Select
              value={workTemplateId}
              label="Work"
              onChange={(e) =>
                handleTemplateChange(
                  e.target.value as string
                )
              }
            >
              {templates.map((template) => (
                <MenuItem
                  key={template.id}
                  value={template.id}
                >
                  {template.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Assigned Brother</InputLabel>

            <Select
              value={assignedPublisherId}
              label="Assigned Brother"
              onChange={(e) =>
                setAssignedPublisherId(
                  e.target.value as string
                )
              }
            >
              <MenuItem value="">
                Unassigned
              </MenuItem>

              {publishers.map((publisher) => (
                <MenuItem
                  key={publisher.id}
                  value={publisher.id}
                >
                  {publisher.firstName}{" "}
                  {publisher.lastName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Location"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>

            <Select
              value={status}
              label="Status"
              onChange={(e) =>
                setStatus(
                  e.target.value as AssignmentStatus
                )
              }
            >
              <MenuItem value="Pending">
                Pending
              </MenuItem>

              <MenuItem value="Completed">
                Completed
              </MenuItem>

              <MenuItem value="Cancelled">
                Cancelled
              </MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Notes"
            multiline
            minRows={3}
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
          disabled={!date || !workTemplateId}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}