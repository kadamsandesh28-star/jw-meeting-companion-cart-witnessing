import { TextField, Stack } from "@mui/material";

import { ServiceGroup } from "../types/serviceGroup";

interface BasicInformationProps {
  serviceGroup: ServiceGroup;
  onChange: (serviceGroup: ServiceGroup) => void;
}

export default function BasicInformation({
  serviceGroup,
  onChange,
}: BasicInformationProps) {
  return (
    <Stack spacing={2}>
      <TextField
        label="Group Name"
        fullWidth
        value={serviceGroup.name}
        onChange={(event) =>
          onChange({
            ...serviceGroup,
            name: event.target.value,
          })
        }
      />

      <TextField
        label="Notes"
        fullWidth
        multiline
        minRows={3}
        value={serviceGroup.notes ?? ""}
        onChange={(event) =>
          onChange({
            ...serviceGroup,
            notes: event.target.value,
          })
        }
      />
    </Stack>
  );
}