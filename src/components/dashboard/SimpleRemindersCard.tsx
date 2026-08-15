import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import {
  Card,
  CardContent,
  Checkbox,
  Chip,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import { useState } from "react";

interface Reminder {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: "family" | "meeting" | "bible";
  completed: boolean;
}

const defaultReminders: Reminder[] = [
  {
    id: "1",
    title: "Family Worship",
    subtitle: "Today • 7:00 PM",
    badge: "Today",
    icon: "family",
    completed: false,
  },
  {
    id: "2",
    title: "Bible Reading",
    subtitle: "Daily Spiritual Goal",
    badge: "Daily",
    icon: "bible",
    completed: false,
  },
  {
    id: "3",
    title: "Congregation Meeting",
    subtitle: "Thursday • 7:00 PM",
    badge: "Upcoming",
    icon: "meeting",
    completed: false,
  },
];

function getIcon(icon: Reminder["icon"]) {
  switch (icon) {
    case "family":
      return (
        <FavoriteRoundedIcon color="error" />
      );

    case "meeting":
      return (
        <GroupsRoundedIcon color="primary" />
      );

    case "bible":
      return (
        <MenuBookRoundedIcon color="success" />
      );

    default:
      return (
        <CheckCircleOutlineRoundedIcon />
      );
  }
}

export default function SimpleRemindersCard() {
  const [reminders, setReminders] =
    useState(defaultReminders);

  function handleToggle(id: string) {
    setReminders((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
            }
          : item
      )
    );
  }

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
            label="View All"
            clickable
          />
        </Stack>

        {reminders.map((item, index) => (
          <Stack key={item.id}>

            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              py={1.5}
            >
              <Checkbox
                checked={item.completed}
                onChange={() =>
                  handleToggle(item.id)
                }
              />

              {getIcon(item.icon)}

              <Stack flex={1}>
                <Typography
                  fontWeight={600}
                  sx={{
                    textDecoration:
                      item.completed
                        ? "line-through"
                        : "none",
                  }}
                >
                  {item.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {item.subtitle}
                </Typography>
              </Stack>

              <Chip
                label={item.badge}
                size="small"
                color={
                  item.completed
                    ? "success"
                    : "primary"
                }
              />

              <IconButton size="small">
                <ChevronRightRoundedIcon />
              </IconButton>

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