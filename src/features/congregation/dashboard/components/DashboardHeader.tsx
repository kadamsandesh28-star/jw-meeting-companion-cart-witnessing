import {
  Box,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";

interface DashboardHeaderProps {
  congregationName: string;
}

export default function DashboardHeader({
  congregationName,
}: DashboardHeaderProps) {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 6,
        p: { xs: 3, md: 5 },
        minHeight: 220,
        display: "flex",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#1565C0 0%,#1E88E5 55%,#64B5F6 100%)",
        color: "white",
        boxShadow: "0 16px 40px rgba(25,118,210,.20)",
      }}
    >
      {/* Decorative circles */}
      <Box
        sx={{
          position: "absolute",
          right: -80,
          top: -80,
          width: 220,
          height: 220,
          borderRadius: "50%",
          bgcolor: "rgba(255,255,255,.08)",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          right: 120,
          bottom: -70,
          width: 180,
          height: 180,
          borderRadius: "50%",
          bgcolor: "rgba(255,255,255,.05)",
        }}
      />

      {/* Decorative hills */}
      <Box
        sx={{
          position: "absolute",
          bottom: -10,
          right: 0,
          width: "45%",
          height: 120,
          opacity: 0.12,
          borderTopLeftRadius: "100%",
          bgcolor: "white",
        }}
      />

      <Stack
        direction={{ xs: "column", lg: "row" }}
        justifyContent="space-between"
        spacing={4}
        sx={{
          width: "100%",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Box>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <WbSunnyOutlinedIcon />

            <Typography
              variant="h5"
              fontWeight={700}
            >
              {greeting}
            </Typography>
          </Stack>

          <Typography
            variant="h4"
            fontWeight={800}
            sx={{
              mt: 2,
              mb: 3,
              fontSize: {
                xs: "2rem",
                md: "3rem",
              },
            }}
          >
            {congregationName}
          </Typography>

          <Paper
            elevation={0}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 2,
              px: 3,
              py: 2,
              borderRadius: 4,
              bgcolor: "rgba(255,255,255,.14)",
              backdropFilter: "blur(10px)",
              color: "white",
            }}
          >
            <FormatQuoteRoundedIcon />

            <Box>
              <Typography
                sx={{
                  fontStyle: "italic",
                  fontSize: "1.15rem",
                }}
              >
                Shepherd the flock of God.
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  opacity: 0.85,
                }}
              >
                — 1 Peter 5:2
              </Typography>
            </Box>
          </Paper>
        </Box>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent={{
            xs: "flex-start",
            lg: "flex-end",
          }}
        >
          <CalendarTodayOutlinedIcon />

          <Typography
            fontWeight={600}
            sx={{
              fontSize: "1rem",
            }}
          >
            {today}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}