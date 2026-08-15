import { Stack } from "@mui/material";

import BasicInformation from "./BasicInformation";
import AppointmentInformation from "./AppointmentInformation";
import { BodyMember } from "../types/bodyMember";

interface Props {
  member: BodyMember;
  onChange: (member: BodyMember) => void;
}

export default function BodyMemberForm({
  member,
  onChange,
}: Props) {
  return (
    <Stack spacing={4}>
      <BasicInformation
        member={member}
        onChange={onChange}
      />

      <AppointmentInformation
        member={member}
        onChange={onChange}
      />
    </Stack>
  );
}