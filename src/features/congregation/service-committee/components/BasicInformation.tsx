import { Stack, TextField } from "@mui/material";

import { ServiceCommittee } from "../types/ServiceCommittee";

interface BasicInformationProps {
  serviceCommittee: ServiceCommittee;
  onChange: (serviceCommittee: ServiceCommittee) => void;
}

export default function BasicInformation({
  serviceCommittee,
  onChange,
}: BasicInformationProps) {
  return (
    <Stack spacing={2}>
      <TextField
        label="Committee Name"
        required
        fullWidth
        value={serviceCommittee.name}
        onChange={(event) =>
          onChange({
            ...serviceCommittee,
            name: event.target.value,
          })
        }
      />

      <TextField
        label="Notes"
        fullWidth
        multiline
        minRows={3}
        value={serviceCommittee.notes ?? ""}
        onChange={(event) =>
          onChange({
            ...serviceCommittee,
            notes: event.target.value,
          })
        }
      />
    </Stack>
  );
}    