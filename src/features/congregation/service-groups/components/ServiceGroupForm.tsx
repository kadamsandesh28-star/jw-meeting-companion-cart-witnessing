import { Stack } from "@mui/material";

import { ServiceGroup } from "../types/serviceGroup";

import BasicInformation from "./BasicInformation";
import MeetingInformation from "./MeetingInformation";
import MembersSection from "./MembersSection";

interface ServiceGroupFormProps {
  serviceGroup: ServiceGroup;
  onChange: (serviceGroup: ServiceGroup) => void;
}

export default function ServiceGroupForm({
  serviceGroup,
  onChange,
}: ServiceGroupFormProps) {
  return (
    <Stack spacing={4}>
      <BasicInformation
        serviceGroup={serviceGroup}
        onChange={onChange}
      />

      <MeetingInformation
        serviceGroup={serviceGroup}
        onChange={onChange}
      />

      <MembersSection
        serviceGroup={serviceGroup}
        onChange={onChange}
      />
    </Stack>
  );
}