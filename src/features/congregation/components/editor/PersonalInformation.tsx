import { TextField, Grid, MenuItem } from "@mui/material";

import { Publisher } from "../../publishers/types/Publisher";
import { Gender } from "../../publishers/types/enums";

interface PersonalInformationProps {
  publisher: Publisher;
  onChange: (publisher: Publisher) => void;
}

export default function PersonalInformation({
  publisher,
  onChange,
}: PersonalInformationProps) {
  const update = <K extends keyof Publisher>(key: K, value: Publisher[K]) => {
    onChange({
      ...publisher,
      [key]: value,
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="First Name"
          value={publisher.firstName}
          onChange={(e) => update("firstName", e.target.value)}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Last Name"
          value={publisher.lastName}
          onChange={(e) => update("lastName", e.target.value)}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          select
          label="Gender"
          value={publisher.gender}
          onChange={(e) => update("gender", e.target.value as Gender)}
        >
          {Object.values(Gender).map((gender) => (
            <MenuItem key={gender} value={gender}>
              {gender}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          type="date"
          label="Birth Date"
          value={publisher.birthDate ?? ""}
          onChange={(e) => update("birthDate", e.target.value)}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          type="date"
          label="Baptism Date"
          value={publisher.baptismDate ?? ""}
          onChange={(e) => update("baptismDate", e.target.value)}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
      </Grid>
    </Grid>
  );
}