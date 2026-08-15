import {
  Chip,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import { DashboardEvent } from "../models/DashboardEvent";

interface UpcomingEventsProps {
  events: DashboardEvent[];
  onSelect?: (event: DashboardEvent) => void;
}

export default function UpcomingEvents({
  events,
  onSelect,
}: UpcomingEventsProps) {
  const sortedEvents = [...events].sort(
    (a, b) =>
      new Date(a.date).getTime() -
      new Date(b.date).getTime()
  );

  if (sortedEvents.length === 0) {
    return (
      <Typography
        color="text.secondary"
        align="center"
        py={3}
      >
        No events this month.
      </Typography>
    );
  }

  return (
    <List dense>
      {sortedEvents.map((event) => (
        <ListItem
          key={event.id}
          onClick={() => onSelect?.(event)}
          sx={{
            cursor: onSelect ? "pointer" : "default",
            borderRadius: 2,
            transition: "0.2s",
            "&:hover": onSelect
              ? {
                  bgcolor: "action.hover",
                }
              : {},
          }}
        >
          <ListItemText
            primary={event.title}
            secondary={new Date(
              event.date
            ).toLocaleDateString()}
          />

          <Chip
            size="small"
            label={event.category}
            color="primary"
            variant="outlined"
          />
        </ListItem>
      ))}
    </List>
  );
}