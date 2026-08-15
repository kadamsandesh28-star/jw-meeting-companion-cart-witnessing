import { Stack } from "@mui/material";

import { Publisher } from "../../publishers/types/Publisher";

import PersonalInformation from "./PersonalInformation";
import ContactInformation from "./ContactInformation";
import FamilyInformation from "./FamilyInformation";

interface PublisherFormProps {
  publisher: Publisher;
  onChange: (publisher: Publisher) => void;
}

export default function PublisherForm({
  publisher,
  onChange,
}: PublisherFormProps) {
  return (
    <Stack spacing={4}>
      <PersonalInformation
        publisher={publisher}
        onChange={onChange}
      />

      <ContactInformation
        publisher={publisher}
        onChange={onChange}
      />

      <FamilyInformation
        publisher={publisher}
        onChange={onChange}
      />
    </Stack>
  );
}