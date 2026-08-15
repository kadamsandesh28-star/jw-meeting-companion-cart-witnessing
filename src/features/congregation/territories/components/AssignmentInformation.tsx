import {
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useServiceGroups } from "../../service-groups/hooks/useServiceGroups";
import { Territory } from "../types/territory";

interface AssignmentInformationProps {
  territory: Territory;
  onChange: (territory: Territory) => void;
}

export default function AssignmentInformation({
  territory,
  onChange,
}: AssignmentInformationProps) {
  const { serviceGroups } = useServiceGroups();

  return (
    <Stack spacing={3}>
      <Typography variant="h6">
        Assignment Information
      </Typography>

      <TextField
        select
        label="Assigned Service Group"
        value={territory.assignedServiceGroupId}
        onChange={(e) =>
          onChange({
            ...territory,
            assignedServiceGroupId:
              e.target.value,
          })
        }
        fullWidth
      >
        <MenuItem value="">
          None
        </MenuItem>

        {serviceGroups.map((group) => (
          <MenuItem
            key={group.id}
            value={group.id}
          >
            {group.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Map Reference"
        value={territory.mapReference}
        onChange={(e) =>
          onChange({
            ...territory,
            mapReference: e.target.value,
          })
        }
        fullWidth
      />

      <TextField
        label="Address Notes"
        value={territory.addressNotes}
        onChange={(e) =>
          onChange({
            ...territory,
            addressNotes: e.target.value,
          })
        }
        fullWidth
        multiline
        minRows={3}
      />

      <TextField
        label="Last Worked"
        type="date"
        value={territory.lastWorked ?? ""}
        onChange={(e) =>
          onChange({
            ...territory,
            lastWorked: e.target.value,
          })
        }
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        label="Next Due"
        type="date"
        value={territory.nextDue ?? ""}
        onChange={(e) =>
          onChange({
            ...territory,
            nextDue: e.target.value,
          })
        }
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        label="Notes"
        value={territory.notes}
        onChange={(e) =>
          onChange({
            ...territory,
            notes: e.target.value,
          })
        }
        fullWidth
        multiline
        minRows={4}
      />
    </Stack>
  );
}