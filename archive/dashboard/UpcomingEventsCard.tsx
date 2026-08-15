import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

import EventIcon from "@mui/icons-material/Event";

const events = [
  {
    id: 1,
    title: "Midweek Meeting",
    date: "Wednesday • 7:00 PM",
  },
  {
    id: 2,
    title: "Weekend Meeting",
    date: "Sunday • 10:00 AM",
  },
  {
    id: 3,
    title: "Shepherding Visit",
    date: "Friday • 6:30 PM",
  },
  {
    id: 4,
    title: "Congregation Cleaning",
    date: "Saturday • 4:00 PM",
  },
];

export default function UpcomingEventsCard() {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
        >
          📅 Upcoming Events
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <List disablePadding>
          {events.map((event) => (
            <ListItem key={event.id} disableGutters>
              <ListItemIcon>
                <EventIcon color="primary" />
              </ListItemIcon>

              <ListItemText
                primary={event.title}
                secondary={event.date}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}