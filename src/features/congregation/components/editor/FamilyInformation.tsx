import { Grid, TextField, Typography } from "@mui/material";

import { Publisher } from "../../publishers/types/Publisher";

interface FamilyInformationProps {
  publisher: Publisher;
  onChange: (publisher: Publisher) => void;
}

export default function FamilyInformation({
  publisher,
  onChange,
}: FamilyInformationProps) {
  const family = publisher.family ?? {};

  const update = (
    field: keyof NonNullable<Publisher["family"]>,
    value: string
  ) => {
    onChange({
      ...publisher,
      family: {
        ...family,
        [field]: value,
      },
    });
  };

  return (
    <>
      <Typography variant="h6">
        Family Information
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="Spouse"
            value={family.spouse ?? ""}
            onChange={(e) => update("spouse", e.target.value)}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="Parents"
            value={family.parents ?? ""}
            onChange={(e) => update("parents", e.target.value)}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="Children"
            value={family.children ?? ""}
            onChange={(e) => update("children", e.target.value)}
          />
        </Grid>
      </Grid>
    </>
  );
}