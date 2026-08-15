import { Chip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ScheduleIcon from "@mui/icons-material/Schedule";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import PersonOffIcon from "@mui/icons-material/PersonOff";

export type Status =
  | "Pending"
  | "Completed"
  | "Not Home"
  | "Moved Away";

interface StatusChipProps {
  status: Status;
}

export default function StatusChip({
  status,
}: StatusChipProps) {
  switch (status) {
    case "Completed":
      return (
        <Chip
          icon={<CheckCircleIcon />}
          label="Completed"
          color="success"
          variant="filled"
        />
      );

    case "Not Home":
      return (
        <Chip
          icon={<HomeWorkIcon />}
          label="Not Home"
          color="warning"
          variant="filled"
        />
      );

    case "Moved Away":
      return (
        <Chip
          icon={<PersonOffIcon />}
          label="Moved Away"
          color="error"
          variant="filled"
        />
      );

    default:
      return (
        <Chip
          icon={<ScheduleIcon />}
          label="Pending"
          color="primary"
          variant="filled"
        />
      );
  }
}