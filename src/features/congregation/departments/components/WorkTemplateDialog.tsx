import { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";

import { DepartmentWorkTemplate } from "../models/DepartmentWorkTemplate";

interface WorkTemplateDialogProps {
  open: boolean;
  title: string;
  template?: DepartmentWorkTemplate;
  onClose: () => void;
  onSave: (data: {
    name: string;
    defaultLocation: string;
    active: boolean;
  }) => void;
}

export default function WorkTemplateDialog({
  open,
  title,
  template,
  onClose,
  onSave,
}: WorkTemplateDialogProps) {
  const [name, setName] = useState("");
  const [defaultLocation, setDefaultLocation] =
    useState("");
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (!open) return;

    setName(template?.name ?? "");
    setDefaultLocation(
      template?.defaultLocation ?? ""
    );
    setActive(template?.active ?? true);
  }, [open, template]);

  const handleSave = () => {
    if (!name.trim()) {
      return;
    }

    onSave({
      name: name.trim(),
      defaultLocation: defaultLocation.trim(),
      active,
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
        <Stack
          spacing={2}
          sx={{ mt: 1 }}
        >
          <TextField
            autoFocus
            required
            fullWidth
            label="Work"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
          />

          <TextField
            fullWidth
            label="Default Location"
            value={defaultLocation}
            onChange={(event) =>
              setDefaultLocation(event.target.value)
            }
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={active}
                onChange={(event) =>
                  setActive(event.target.checked)
                }
              />
            }
            label="Active"
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
          disabled={!name.trim()}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}