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
  ScheduleItem,
  SchedulePeriod,
} from "../models/ScheduleItem";

interface Props {
  open: boolean;
  item?: ScheduleItem | null;
  onClose: () => void;
  onSave: (item: ScheduleItem) => void;
}

export default function AddScheduleDialog({
  open,
  item,
  onClose,
  onSave,
}: Props) {
  const [time, setTime] = useState("");

  const [activity, setActivity] =
    useState("");

  const [period, setPeriod] =
    useState<SchedulePeriod>("Morning");

  useEffect(() => {
    if (!open) return;

    if (item) {
      setTime(item.time);
      setActivity(item.activity);
      setPeriod(item.period);
    } else {
      setTime("");
      setActivity("");
      setPeriod("Morning");
    }
  }, [open, item]);

  function handleSave() {
    if (!time.trim()) return;

    if (!activity.trim()) return;

    onSave({
      id: item?.id ?? crypto.randomUUID(),

      time,

      activity,

      period,

      completed:
        item?.completed ?? false,

      icon:
        item?.icon ?? "activity",
    });

    onClose();
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {item
          ? "Edit Activity"
          : "Add Activity"}
      </DialogTitle>

      <DialogContent>
        <Stack
          spacing={3}
          mt={1}
        >
          <TextField
            label="Time"
            type="time"
            value={time}
            onChange={(e) =>
              setTime(e.target.value)
            }
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            label="Activity"
            placeholder="Morning Prayer"
            value={activity}
            onChange={(e) =>
              setActivity(
                e.target.value
              )
            }
          />

          <FormControl fullWidth>
            <InputLabel>
              Period
            </InputLabel>

            <Select
              value={period}
              label="Period"
              onChange={(e) =>
                setPeriod(
                  e.target
                    .value as SchedulePeriod
                )
              }
            >
              <MenuItem value="Morning">
                Morning
              </MenuItem>

              <MenuItem value="Afternoon">
                Afternoon
              </MenuItem>

              <MenuItem value="Evening">
                Evening
              </MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
        >
          {item ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}