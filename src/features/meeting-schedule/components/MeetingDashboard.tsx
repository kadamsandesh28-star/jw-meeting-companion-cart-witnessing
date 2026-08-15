import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import ChurchRoundedIcon from "@mui/icons-material/ChurchRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import ViewAgendaRoundedIcon from "@mui/icons-material/ViewAgendaRounded";

import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

const cards = [
  {
    title: "Midweek Meeting",
    description:
      "Prepare one or two months of Midweek Meeting schedules and export to PDF.",
    icon: <CalendarMonthRoundedIcon color="success" />,
  },
  {
    title: "Weekend Meeting",
    description:
      "Assign chairman, public speaker, Watchtower conductor, reader and prayers.",
    icon: <ChurchRoundedIcon color="success" />,
  },
  {
    title: "Field Service",
    description:
      "Prepare the monthly field service arrangement for the congregation.",
    icon: <GroupsRoundedIcon color="success" />,
  },
  {
    title: "Other Schedule",
    description:
      "Create congregation schedules for cleaning, maintenance and special events.",
    icon: <ViewAgendaRoundedIcon color="success" />,
  },
];

export default function MeetingDashboard() {
  return (
    <Grid
      container
      spacing={3}
    >
      {cards.map((card) => (
        <Grid
          key={card.title}
          size={{
            xs: 12,
            sm: 6,
            md: 3,
          }}
        >
          <Card
            elevation={0}
            sx={{
              height: "100%",
              borderRadius: 4,
              border: 1,
              borderColor: "divider",
            }}
          >
            <CardActionArea
              sx={{
                height: "100%",
                p: 3,
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  {card.icon}

                  <Typography
                    variant="h6"
                    fontWeight={700}
                  >
                    {card.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {card.description}
                  </Typography>
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}