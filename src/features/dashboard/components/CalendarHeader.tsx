import { Stack, Typography, IconButton } from "@mui/material";
import {
  ChevronLeftRounded,
  ChevronRightRounded,
} from "@mui/icons-material";

interface CalendarHeaderProps {
  month: Date;
  onPrevious: () => void;
  onNext: () => void;
}

export default function CalendarHeader({
  month,
  onPrevious,
  onNext,
}: CalendarHeaderProps) {
  const label = month.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
    >
      <Typography variant="h6" fontWeight={700}>
        📅 Calendar
      </Typography>

      <Stack direction="row" spacing={1} alignItems="center">
        <IconButton onClick={onPrevious}>
          <ChevronLeftRounded />
        </IconButton>

        <Typography fontWeight={600}>
          {label}
        </Typography>

        <IconButton onClick={onNext}>
          <ChevronRightRounded />
        </IconButton>
      </Stack>
    </Stack>
  );
}