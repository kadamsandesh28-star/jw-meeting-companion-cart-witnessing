import {
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import DashboardCard from "./DashboardCard";

export default function QuickActionsCard() {
  const navigate = useNavigate();

  const actions = [
    {
      emoji: "📚",
      title: "Research",
      path: "/library/research",
    },
    {
      emoji: "🎯",
      title: "Goals",
      path: "/library/goals",
    },
    {
      emoji: "🌍",
      title: "Ministry",
      path: "/library/ministry",
    },
    {
      emoji: "⏱",
      title: "Practice",
      path: "/timers",
    },
  ];

  return (
    <DashboardCard>
      <CardContent>

        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
        >
          ⚡ Quick Actions
        </Typography>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          {actions.map((action) => (
            <Grid
              key={action.title}
              size={{ xs: 6 }}
            >
              <DashboardCard
                sx={{
                  mb: 0,
                  boxShadow: 1,
                }}
              >
                <CardActionArea
                  onClick={() => navigate(action.path)}
                >
                  <CardContent
                    sx={{
                      textAlign: "center",
                      py: 4,
                    }}
                  >
                    <Typography
                      variant="h3"
                    >
                      {action.emoji}
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{ mt: 1 }}
                    >
                      {action.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </DashboardCard>
            </Grid>
          ))}
        </Grid>

      </CardContent>
    </DashboardCard>
  );
}