import {
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Divider,
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import GroupsIcon from "@mui/icons-material/Groups";
import ApartmentIcon from "@mui/icons-material/Apartment";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { getCongregationDashboardSummary } from "../../src/services/congregationDashboardService";

export default function CongregationSummaryCard() {
  const summary = getCongregationDashboardSummary();

  const cards = [
    {
      title: "Publishers",
      value: summary.publishers,
      icon: <PeopleIcon color="primary" fontSize="large" />,
    },
    {
      title: "Groups",
      value: summary.groups,
      icon: <GroupsIcon color="success" fontSize="large" />,
    },
    {
      title: "Departments",
      value: summary.departments,
      icon: <ApartmentIcon color="warning" fontSize="large" />,
    },
    {
      title: "Shepherding",
      value: summary.shepherdingRecords,
      icon: <FavoriteIcon color="error" fontSize="large" />,
    },
  ];

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
        >
          👥 Congregation Summary
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          {cards.map((card) => (
            <Grid key={card.title} size={{ xs: 6, md: 3 }}>
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  textAlign: "center",
                  borderRadius: 2,
                }}
              >
                {card.icon}

                <Typography
                  variant="h4"
                  fontWeight="bold"
                  mt={1}
                >
                  {card.value}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {card.title}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}