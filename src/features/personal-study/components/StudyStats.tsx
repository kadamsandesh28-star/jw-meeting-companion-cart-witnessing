import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ArchiveRoundedIcon from "@mui/icons-material/ArchiveRounded";
import { Grid, Paper, Stack, Typography } from "@mui/material";

import { Study } from "../models/Study";

interface StudyStatsProps {
  studies: Study[];
}

export default function StudyStats({
  studies,
}: StudyStatsProps) {
  const totalStudies = studies.length;

  const favoriteStudies = studies.filter(
    (study) => study.favorite
  ).length;

  const archivedStudies = studies.filter(
    (study) => study.archived
  ).length;

  const stats = [
    {
      label: "Studies",
      value: totalStudies,
      icon: <AutoStoriesRoundedIcon fontSize="large" />,
    },
    {
      label: "Favorites",
      value: favoriteStudies,
      icon: <FavoriteRoundedIcon fontSize="large" />,
    },
    {
      label: "Archived",
      value: archivedStudies,
      icon: <ArchiveRoundedIcon fontSize="large" />,
    },
  ];

  return (
    <Grid container spacing={3}>
      {stats.map((stat) => (
        <Grid
          key={stat.label}
          size={{ xs: 12, sm: 4 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              height: "100%",
            }}
          >
            <Stack spacing={2}>
              {stat.icon}

              <Typography
                variant="h4"
                fontWeight={700}
              >
                {stat.value}
              </Typography>

              <Typography
                color="text.secondary"
              >
                {stat.label}
              </Typography>
            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}