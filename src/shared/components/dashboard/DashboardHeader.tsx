import { Box, Divider, Typography } from "@mui/material";

interface DashboardHeaderProps {
  congregationName: string;
}

const DashboardHeader = ({ congregationName }: DashboardHeaderProps) => {
  const now = new Date();
  const hour = now.getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now);

  return (
    <Box sx={{ mb: 5 }}>
      <Typography
        variant="h3"
        fontWeight={700}
        gutterBottom
      >
        {greeting}
      </Typography>

      <Typography
        variant="h5"
        color="text.primary"
        gutterBottom
      >
        {congregationName}
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        gutterBottom
      >
        {formattedDate}
      </Typography>

      <Typography
        variant="body2"
        fontStyle="italic"
        color="text.secondary"
        sx={{ mt: 3 }}
      >
        "Care for the flock among you."
      </Typography>

      <Typography
        variant="caption"
        color="text.secondary"
      >
        — 1 Peter 5:2
      </Typography>

      <Divider sx={{ mt: 4 }} />
    </Box>
  );
};

export default DashboardHeader;