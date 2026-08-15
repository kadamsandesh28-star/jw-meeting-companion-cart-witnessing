import CheckBoxOutlineBlankRoundedIcon from "@mui/icons-material/CheckBoxOutlineBlankRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";

import {
  Card,
  CardContent,
  Checkbox,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

export interface ReminderItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  completed: boolean;
  icon: "meeting" | "family" | "bible" | "report";
}

interface RemindersCardProps {
  reminders: ReminderItem[];
  onToggle: (id: string) => void;
}

function getReminderIcon(icon: ReminderItem["icon"]) {
  switch (icon) {
    case "meeting":
      return (
        <GroupsRoundedIcon color="primary" />
      );

    case "family":
      return (
        <EventRoundedIcon color="secondary" />
      );

    case "bible":
      return (
        <MenuBookRoundedIcon color="success" />
      );

    case "report":
      return (
        <AssignmentRoundedIcon color="warning" />
      );

    default:
      return (
        <CheckBoxOutlineBlankRoundedIcon />
      );
  }
}

export default function RemindersCard({
  reminders,
  onToggle,
}: RemindersCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardContent>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography
            variant="h6"
            fontWeight={700}
          >
            🔔 Reminders
          </Typography>

          <Chip
            size="small"
            color="primary"
            label="View All"
          />
        </Stack>

        {reminders.map((reminder, index) => (
          <Stack key={reminder.id}>

            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              py={1.5}
            >
              <Checkbox
                checked={reminder.completed}
                onChange={() =>
                  onToggle(reminder.id)
                }
              />

              {getReminderIcon(
                reminder.icon
              )}

              <Stack flex={1}>
                <Typography
                  fontWeight={700}
                >
                  {reminder.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {reminder.subtitle}
                </Typography>
              </Stack>

              <Chip
                label={reminder.badge}
                size="small"
                color={
                  reminder.completed
                    ? "success"
                    : "primary"
                }
              />
            </Stack>

            {index <
              reminders.length - 1 && (
              <Divider />
            )}
          </Stack>
        ))}

      </CardContent>
    </Card>
  );
}