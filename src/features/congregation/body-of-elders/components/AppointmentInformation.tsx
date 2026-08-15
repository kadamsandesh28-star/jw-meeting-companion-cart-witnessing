import {
  FormControlLabel,
  Stack,
  Switch,
  TextField,
} from "@mui/material";

import { BodyMember } from "../types/bodyMember";

interface Props {
  member: BodyMember;
  onChange: (member: BodyMember) => void;
}

export default function AppointmentInformation({
  member,
  onChange,
}: Props) {
  return (
    <Stack spacing={3}>
      <TextField
        label="Appointment Date"
        type="date"
        value={member.appointmentDate}
        onChange={(e) =>
          onChange({
            ...member,
            appointmentDate: e.target.value,
          })
        }
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
      />

      <FormControlLabel
        control={
          <Switch
            checked={member.active}
            onChange={(e) =>
              onChange({
                ...member,
                active: e.target.checked,
              })
            }
          />
        }
        label="Active"
      />

      <TextField
        label="Notes"
        multiline
        minRows={4}
        value={member.notes}
        onChange={(e) =>
          onChange({
            ...member,
            notes: e.target.value,
          })
        }
        fullWidth
      />
    </Stack>
  );
}