import {
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

interface Props {
  title: string;
  month: string;
  count: number;
  description?: string;
}

export default function ScheduleHeader({
  title,
  month,
  count,
  description,
}: Props) {
  return (
    <Stack spacing={4}>
      <Typography
        variant="h4"
        fontWeight={700}
        color="success.main"
      >
        {title}
      </Typography>

      <Grid
        container
        spacing={2}
      >
        <Grid
          size={{
            xs: 12,
            md: 8,
          }}
        >
          <TextField
            fullWidth
            label="Month"
            value={month}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 4,
          }}
        >
          <TextField
            fullWidth
            label="Weeks"
            value={count}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
      </Grid>

      {description && (
        <Typography color="text.secondary">
          {description}
        </Typography>
      )}
    </Stack>
  );
}