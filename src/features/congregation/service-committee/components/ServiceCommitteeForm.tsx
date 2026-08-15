import { Stack } from "@mui/material";

import { ServiceCommittee } from "../types/ServiceCommittee";

import BasicInformation from "./BasicInformation";
import CommitteeMembers from "./CommitteeMembers";
import ResponsibilitiesSection from "./ResponsibilitiesSection";

interface ServiceCommitteeFormProps {
  serviceCommittee: ServiceCommittee;
  onChange: (serviceCommittee: ServiceCommittee) => void;
}

export default function ServiceCommitteeForm({
  serviceCommittee,
  onChange,
}: ServiceCommitteeFormProps) {
  return (
    <Stack spacing={4}>
      <BasicInformation
        serviceCommittee={serviceCommittee}
        onChange={onChange}
      />

      <CommitteeMembers
        serviceCommittee={serviceCommittee}
        onChange={onChange}
      />

      <ResponsibilitiesSection
        serviceCommittee={serviceCommittee}
        onChange={onChange}
      />
    </Stack>
  );
}