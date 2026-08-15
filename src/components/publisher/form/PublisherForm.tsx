import { Stack } from "@mui/material";
import { useEffect, useState } from "react";

import { Publisher } from "../../../features/congregation/publishers/models/Publisher";

import PublisherBasicInfo from "./sections/PublisherBasicInfo";
import PublisherContactInfo from "./sections/PublisherContactInfo";
import PublisherCongregationInfo from "./sections/PublisherCongregationInfo";
import PublisherAddressInfo from "./sections/PublisherAddressInfo";
import PublisherEmergencyContact from "./sections/PublisherEmergencyContact";

interface PublisherFormProps {
  value: Publisher;
  onChange: (publisher: Publisher) => void;
}

export default function PublisherForm({
  value,
  onChange,
}: PublisherFormProps) {
  const [publisher, setPublisher] = useState<Publisher>(value);

  useEffect(() => {
    setPublisher(value);
  }, [value]);

  function handleChange(updated: Publisher) {
    setPublisher(updated);
    onChange(updated);
  }

  return (
    <Stack spacing={3}>
      <PublisherBasicInfo
        publisher={publisher}
        onChange={handleChange}
      />

      <PublisherContactInfo
        publisher={publisher}
        onChange={handleChange}
      />

      <PublisherCongregationInfo
        publisher={publisher}
        onChange={handleChange}
      />

      <PublisherAddressInfo
        publisher={publisher}
        onChange={handleChange}
      />

      <PublisherEmergencyContact
        publisher={publisher}
        onChange={handleChange}
      />
    </Stack>
  );
}