import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import {
  Card,
  CardContent,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function MeetingSchedulesCard() {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        borderRadius: 4,
        height: "100%",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          fontWeight={700}
          gutterBottom
        >
          Meeting Schedules
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          Prepare congregation meeting schedules.
        </Typography>

        <List disablePadding>
          <ListItemButton
            onClick={() =>
              navigate("/congregation/midweek")
            }
          >
            <ListItemIcon>
              <CalendarMonthRoundedIcon color="primary" />
            </ListItemIcon>

            <ListItemText
              primary="Midweek Meeting"
              secondary="Monthly meeting schedule"
            />

            <ChevronRightRoundedIcon />
          </ListItemButton>

          <ListItemButton
            onClick={() =>
              navigate("/congregation/weekend")
            }
          >
            <ListItemIcon>
              <CalendarMonthRoundedIcon color="success" />
            </ListItemIcon>

            <ListItemText
              primary="Weekend Meeting"
              secondary="Weekend meeting schedule"
            />

            <ChevronRightRoundedIcon />
          </ListItemButton>

          <ListItemButton
            onClick={() =>
              navigate("/congregation/field-service")
            }
          >
            <ListItemIcon>
              <CalendarMonthRoundedIcon color="warning" />
            </ListItemIcon>

            <ListItemText
              primary="Field Service"
              secondary="Monthly field service schedule"
            />

            <ChevronRightRoundedIcon />
          </ListItemButton>

          <ListItemButton disabled>
            <ListItemIcon>
              <CalendarMonthRoundedIcon color="disabled" />
            </ListItemIcon>

            <ListItemText
              primary="Other Schedule"
              secondary="Coming soon"
            />

            <ChevronRightRoundedIcon />
          </ListItemButton>
        </List>
      </CardContent>
    </Card>
  );
}