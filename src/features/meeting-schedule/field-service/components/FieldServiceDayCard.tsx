import AddRoundedIcon from "@mui/icons-material/AddRounded";

import {
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import {
  FieldServiceArrangement,
  FieldServiceDay,
} from "../models/FieldServiceSchedule";

interface Props {
  day: FieldServiceDay;

  onAddArrangement: () => void;

  renderArrangement: (
    arrangement: FieldServiceArrangement
  ) => React.ReactNode;
}

export default function FieldServiceDayCard({
  day,
  onAddArrangement,
  renderArrangement,
}: Props) {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Stack spacing={3}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="h6"
              fontWeight={700}
              color="success.main"
            >
              {day.day}
            </Typography>

            <Button
              variant="outlined"
              size="small"
              startIcon={<AddRoundedIcon />}
              onClick={onAddArrangement}
            >
              Add Arrangement
            </Button>
          </Stack>

          <Divider />

          {day.arrangements.length === 0 ? (
            <Typography
              color="text.secondary"
            >
              No arrangements added yet.
            </Typography>
          ) : (
            <Stack spacing={2}>
              {day.arrangements.map(
                (arrangement) =>
                  renderArrangement(arrangement)
              )}
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}