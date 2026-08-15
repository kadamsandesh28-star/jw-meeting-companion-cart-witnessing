import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

import {
  Checkbox,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";

import type { ActionItem } from "../models/AgendaItem";
import { useMeetingElders } from "../hooks/useMeetingElders";

interface Props {
  item: ActionItem;
  onChange: (item: ActionItem) => void;
  onDelete: () => void;
}

export default function ActionItemRow({
  item,
  onChange,
  onDelete,
}: Props) {
  const elders = useMeetingElders();

  return (
    <Stack
      spacing={2}
      sx={{
        p: 2,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Grid
        container
        spacing={2}
      >
        <Grid
          size={{
            xs: 12,
            md: 5,
          }}
        >
          <TextField
            fullWidth
            label="Task"
            value={item.task}
            onChange={(e) =>
              onChange({
                ...item,
                task: e.target.value,
              })
            }
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 3,
          }}
        >
          <TextField
            select
            fullWidth
            label="Assigned To"
            value={item.assignedTo}
            onChange={(e) =>
              onChange({
                ...item,
                assignedTo: e.target.value,
              })
            }
          >
            {elders.map((elder) => (
              <MenuItem
                key={elder.id}
                value={elder.name}
              >
                {elder.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 2,
          }}
        >
          <TextField
            fullWidth
            type="date"
            label="Due Date"
            value={item.dueDate}
            onChange={(e) =>
              onChange({
                ...item,
                dueDate: e.target.value,
              })
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 2,
          }}
        >
          <TextField
            select
            fullWidth
            label="Priority"
            value={item.priority}
            onChange={(e) =>
              onChange({
                ...item,
                priority: e.target.value as ActionItem["priority"],
              })
            }
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Normal">Normal</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Checkbox
          checked={item.completed}
          onChange={(e) =>
            onChange({
              ...item,
              completed: e.target.checked,
            })
          }
        />

        <IconButton
          color="error"
          onClick={onDelete}
        >
          <DeleteOutlineRoundedIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
}