import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EventIcon from "@mui/icons-material/Event";
import {
  Card,
  CardContent,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import { Publisher } from "../../../features/congregation/publishers/models/Publisher";
import ProfileSection from "./ProfileSection";

interface TimelineCardProps {
  publisher: Publisher;
}

export default function TimelineCard({
  publisher,
}: TimelineCardProps) {
  const timeline = [...publisher.timeline].sort(
    (a, b) =>
      new Date(b.eventDate).getTime() -
      new Date(a.eventDate).getTime()
  );

  return (
    <Card elevation={2}>
      <CardContent>
        <ProfileSection title="Timeline">
          {timeline.length === 0 ? (
            <Typography color="text.secondary">
              No timeline events recorded.
            </Typography>
          ) : (
            <List disablePadding>
              {timeline.map((event, index) => (
                <div key={event.id}>
                  <ListItem
                    disableGutters
                    alignItems="flex-start"
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <EventIcon color="primary" />
                    </ListItemIcon>

                    <ListItemText
                      primary={
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          flexWrap="wrap"
                        >
                          <Typography
                            variant="subtitle1"
                            fontWeight={600}
                          >
                            {event.title}
                          </Typography>

                          <Chip
                            size="small"
                            label={event.type}
                          />
                        </Stack>
                      }
                      secondary={
                        <>
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            sx={{ mt: 0.5 }}
                          >
                            <CalendarTodayIcon
                              fontSize="inherit"
                            />
                            <Typography
                              variant="body2"
                              component="span"
                            >
                              {new Date(
                                event.eventDate
                              ).toLocaleDateString()}
                            </Typography>
                          </Stack>

                          {event.description && (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mt: 1 }}
                            >
                              {event.description}
                            </Typography>
                          )}
                        </>
                      }
                    />
                  </ListItem>

                  {index < timeline.length - 1 && (
                    <Divider />
                  )}
                </div>
              ))}
            </List>
          )}
        </ProfileSection>
      </CardContent>
    </Card>
  );
}