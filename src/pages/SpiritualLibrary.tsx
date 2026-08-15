import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SpiritualLibrary() {
  const navigate = useNavigate();

  const sections = [
    {
      title: "📂 Research",
      description:
        "Research Folder, Archive Folder and Interactive Maps.",
      route: "/library/research",
    },
    {
      title: "📖 Understanding",
      description:
        "Scriptural Understanding, Marginal References and Bible Prophecies.",
      route: "/library/understanding",
    },
    {
      title: "💎 Gems",
      description:
        "Gems Hub, Meditation Prompts and Experiences.",
      route: "/library/gems",
    },
    {
      title: "🎯 Goals",
      description:
        "Goal Tracker and Reading Progress.",
      route: "/library/goals",
    },
    {
      title: "🌍 Ministry",
      description:
        "Field Ministry and Theocratic Directions.",
      route: "/library/ministry",
    },
  ];

  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
      >
        📚 Spiritual Library
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Welcome to your personal spiritual knowledge center.
      </Typography>

      <Grid container spacing={3}>
        {sections.map((section) => (
          <Grid
            key={section.title}
            size={{ xs: 12, md: 6 }}
          >
            <Card
              sx={{
                borderRadius: 3,
                transition: "0.3s",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardActionArea
                onClick={() => navigate(section.route)}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h5"
                    gutterBottom
                  >
                    {section.title}
                  </Typography>

                  <Typography color="text.secondary">
                    {section.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}