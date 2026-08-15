import {
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { Territory } from "../types/territory";

interface BasicInformationProps {
  territory: Territory;
  onChange: (territory: Territory) => void;
}

export default function BasicInformation({
  territory,
  onChange,
}: BasicInformationProps) {
  const update = <K extends keyof Territory>(
    key: K,
    value: Territory[K]
  ) => {
    onChange({
      ...territory,
      [key]: value,
    });
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h6">
        Basic Information
      </Typography>

      <TextField
        label="Territory Number"
        value={territory.number}
        onChange={(e) =>
          update("number", e.target.value)
        }
        fullWidth
        required
      />

      <TextField
        label="Territory Name"
        value={territory.name}
        onChange={(e) =>
          update("name", e.target.value)
        }
        fullWidth
        required
      />

      <TextField
        select
        label="Type"
        value={territory.type}
        onChange={(e) =>
          update("type", e.target.value as Territory["type"])
        }
        fullWidth
      >
        <MenuItem value="Residential">
          Residential
        </MenuItem>

        <MenuItem value="Business">
          Business
        </MenuItem>

        <MenuItem value="Rural">
          Rural
        </MenuItem>

        <MenuItem value="Mixed">
          Mixed
        </MenuItem>
      </TextField>

      <TextField
        select
        label="Status"
        value={territory.status}
        onChange={(e) =>
          update(
            "status",
            e.target.value as Territory["status"]
          )
        }
        fullWidth
      >
        <MenuItem value="Available">
          Available
        </MenuItem>

        <MenuItem value="Assigned">
          Assigned
        </MenuItem>

        <MenuItem value="Completed">
          Completed
        </MenuItem>
      </TextField>
    </Stack>
  );
}