import { Stack, TextField } from "@mui/material";

import { ServiceGroup } from "../types/serviceGroup";

interface MeetingInformationProps {
  serviceGroup: ServiceGroup;
  onChange: (serviceGroup: ServiceGroup) => void;
}

export default function MeetingInformation({
  serviceGroup,
  onChange,
}: MeetingInformationProps) {
  return (
    <Stack spacing={2}>
      <TextField
        label="Meeting Day"
        fullWidth
        value={serviceGroup.meetingDay}
        onChange={(event) =>
          onChange({
            ...serviceGroup,
            meetingDay: event.target.value,
          })
        }
      />

      <TextField
        label="Meeting Time"
        fullWidth
        value={serviceGroup.meetingTime}
        onChange={(event) =>
          onChange({
            ...serviceGroup,
            meetingTime: event.target.value,
          })
        }
      />
    </Stack>
  );
}