import { Chip, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

import { ServiceCommittee } from "../types/ServiceCommittee";

interface ResponsibilitiesSectionProps {
  serviceCommittee: ServiceCommittee;
  onChange: (serviceCommittee: ServiceCommittee) => void;
}

export default function ResponsibilitiesSection({
  serviceCommittee,
  onChange,
}: ResponsibilitiesSectionProps) {
  const [responsibility, setResponsibility] =
    useState("");

  const addResponsibility = () => {
    const value = responsibility.trim();

    if (!value) {
      return;
    }

    if (
      serviceCommittee.responsibilities.includes(value)
    ) {
      return;
    }

    onChange({
      ...serviceCommittee,
      responsibilities: [
        ...serviceCommittee.responsibilities,
        value,
      ],
    });

    setResponsibility("");
  };

  const removeResponsibility = (
    responsibilityToRemove: string
  ) => {
    onChange({
      ...serviceCommittee,
      responsibilities:
        serviceCommittee.responsibilities.filter(
          (responsibility) =>
            responsibility !== responsibilityToRemove
        ),
    });
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h6">
        Responsibilities
      </Typography>

      <TextField
        label="Add Responsibility"
        value={responsibility}
        onChange={(event) =>
          setResponsibility(event.target.value)
        }
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            addResponsibility();
          }
        }}
      />

      <Stack
        direction="row"
        spacing={1}
        flexWrap="wrap"
      >
        {serviceCommittee.responsibilities.map(
          (responsibility) => (
            <Chip
              key={responsibility}
              label={responsibility}
              onDelete={() =>
                removeResponsibility(responsibility)
              }
            />
          )
        )}
      </Stack>
    </Stack>
  );
}