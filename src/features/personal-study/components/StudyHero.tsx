import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import { Box, Paper, Stack, Typography } from "@mui/material";

interface StudyHeroProps {
  totalStudies: number;
}

export default function StudyHero({
  totalStudies,
}: StudyHeroProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 4,
        background:
          "linear-gradient(135deg, #0F766E 0%, #14B8A6 100%)",
        color: "white",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Stack spacing={2}>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              bgcolor: "rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AutoStoriesRoundedIcon
              sx={{ fontSize: 34 }}
            />
          </Box>

          <Box>
            <Typography
              variant="h4"
              fontWeight={700}
            >
              Personal Study
            </Typography>

            <Typography
              sx={{
                opacity: 0.9,
              }}
            >
              Organize your study projects,
              research and spiritual goals.
            </Typography>
          </Box>
        </Stack>

        <Paper
          elevation={0}
          sx={{
            mt: 2,
            p: 2,
            borderRadius: 3,
            bgcolor: "rgba(255,255,255,0.12)",
            color: "white",
          }}
        >
          <Typography
            variant="body2"
            sx={{ opacity: 0.85 }}
          >
            Total Study Projects
          </Typography>

          <Typography
            variant="h3"
            fontWeight={700}
          >
            {totalStudies}
          </Typography>
        </Paper>
      </Stack>
    </Paper>
  );
}