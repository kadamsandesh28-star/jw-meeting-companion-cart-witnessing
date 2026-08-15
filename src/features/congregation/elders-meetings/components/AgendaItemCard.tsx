import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";

import {
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import type { AgendaItem } from "../models/AgendaItem";

import { useMeetingElders } from "../hooks/useMeetingElders";

interface Props {
  number: number;
  item: AgendaItem;
  onChange: (updated: AgendaItem) => void;
}

export default function AgendaItemCard({
  number,
  item,
  onChange,
}: Props) {
  const elders = useMeetingElders();

  return (
    <Stack
      spacing={3}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Typography
        variant="h6"
        fontWeight={700}
      >
        {number}. {item.title || "New Agenda Item"}
      </Typography>

      <Divider />

      {/* Agenda Title */}

      <TextField
        fullWidth
        label="Agenda Title"
        value={item.title}
        onChange={(e) =>
          onChange({
            ...item,
            title: e.target.value,
          })
        }
      />

      {/* Proposed By + Status */}

      <Grid
        container
        spacing={2}
      >
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <TextField
            select
            fullWidth
            label="Proposed By"
            value={item.proposedBy}
            onChange={(e) =>
              onChange({
                ...item,
                proposedBy: e.target.value,
              })
            }
          >
            {elders.map((elder) => (
              <MenuItem
                key={elder.id}
                value={elder.name}
              >
                {elder.name} ({elder.role})
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <TextField
            select
            fullWidth
            label="Status"
            value={item.status}
            onChange={(e) =>
              onChange({
                ...item,
                status: e.target
                  .value as AgendaItem["status"],
              })
            }
          >
            <MenuItem value="Pending">
              Pending
            </MenuItem>

            <MenuItem value="Discussed">
              Discussed
            </MenuItem>

            <MenuItem value="Deferred">
              Deferred
            </MenuItem>

            <MenuItem value="Completed">
              Completed
            </MenuItem>
          </TextField>
        </Grid>
      </Grid>

      {/* Discussion Time + Reference */}

      <Grid
        container
        spacing={2}
      >
        <Grid
          size={{
            xs: 12,
            md: 4,
          }}
        >
          <TextField
            fullWidth
            type="number"
            label="Discussion Time (Minutes)"
            value={item.duration}
            onChange={(e) =>
              onChange({
                ...item,
                duration:
                  Number(e.target.value) || 0,
              })
            }
            InputProps={{
              startAdornment: (
                <AccessTimeRoundedIcon
                  color="primary"
                  sx={{ mr: 1 }}
                />
              ),
            }}
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 8,
          }}
        >
          <TextField
            fullWidth
            label="Reference"
            value={item.reference}
            onChange={(e) =>
              onChange({
                ...item,
                reference: e.target.value,
              })
            }
            placeholder="Acts 20:28"
            InputProps={{
              startAdornment: (
                <AutoStoriesRoundedIcon
                  color="primary"
                  sx={{ mr: 1 }}
                />
              ),
            }}
          />
        </Grid>
      </Grid>

      {/* Notes */}

      <TextField
        fullWidth
        multiline
        minRows={6}
        label="Discussion Notes"
        value={item.notes}
        onChange={(e) =>
          onChange({
            ...item,
            notes: e.target.value,
          })
        }
      />

      {/* Confidential */}

      <FormControlLabel
        control={
          <Checkbox
            checked={item.confidential}
            onChange={(e) =>
              onChange({
                ...item,
                confidential:
                  e.target.checked,
              })
            }
          />
        }
        label="Confidential Agenda Item"
      />

      <Divider />

      {/* Action Items */}

      <Typography
        variant="subtitle1"
        fontWeight={700}
      >
        Action Items
      </Typography>

      {item.actions.length === 0 ? (
        <Typography color="text.secondary">
          No action items yet.
        </Typography>
      ) : (
        item.actions.map((action) => (
          <Stack
            key={action.id}
            direction="row"
            spacing={2}
            alignItems="center"
          >
            <Checkbox
              checked={action.completed}
            />

            <AssignmentTurnedInRoundedIcon color="success" />

            <Typography>
              {action.task}
            </Typography>
          </Stack>
        ))
      )}
    </Stack>
  );
}