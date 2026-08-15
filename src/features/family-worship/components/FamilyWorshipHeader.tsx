import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

import {
  Paper,
  Stack,
  Typography,
} from "@mui/material";

export default function FamilyWorshipHeader() {
  return (
    <Paper
      elevation={0}
      sx={{
        mb: 5,
        p: { xs: 4, md: 6 },
        borderRadius: 8,
        overflow: "hidden",
        position: "relative",
        border: "1px solid",
        borderColor: "#D9E8FF",
        background:
          "linear-gradient(135deg,#1565C0 0%,#1E88E5 45%,#43A047 100%)",
        color: "#fff",
        boxShadow:
          "0 20px 50px rgba(21,101,192,.20)",

        "&::before": {
          content: '""',
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "rgba(255,255,255,.08)",
          top: -120,
          right: -100,
        },

        "&::after": {
          content: '""',
          position: "absolute",
          width: 180,
          height: 180,
          borderRadius: "50%",
          background:
            "rgba(255,255,255,.05)",
          bottom: -70,
          left: -60,
        },
      }}
    >
      <Stack
        spacing={3}
        alignItems="center"
        textAlign="center"
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <AutoStoriesRoundedIcon
          sx={{
            fontSize: 72,
            color: "#fff",
          }}
        />

        <Typography
          variant="h3"
          fontWeight={800}
        >
          Family Worship
        </Typography>

        <Typography
          variant="h6"
          sx={{
            maxWidth: 760,
            opacity: 0.95,
            lineHeight: 1.8,
            fontWeight: 400,
          }}
        >
          Create meaningful family worship
          sessions, organize research,
          attach media, record discussion
          points, and build lasting
          spiritual habits together.
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{
            px: 2.5,
            py: 1,
            borderRadius: 999,
            background:
              "rgba(255,255,255,.15)",
            backdropFilter: "blur(6px)",
          }}
        >
          <FavoriteRoundedIcon
            sx={{
              color: "#FFCDD2",
            }}
            fontSize="small"
          />

          <Typography
            variant="body2"
            sx={{
              color: "#fff",
              fontWeight: 500,
            }}
          >
            Strengthening families through
            God's Word ❤️
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}