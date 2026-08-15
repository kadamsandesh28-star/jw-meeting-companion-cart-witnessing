import { Box, Paper, Typography } from "@mui/material";
import { ReactNode } from "react";

interface DashboardSectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

const DashboardSection = ({
  title,
  subtitle,
  children,
}: DashboardSectionProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        bgcolor: "background.paper",
        height: "100%",
      }}
    >
      <Typography
        variant="h6"
        fontWeight={600}
        gutterBottom
      >
        {title}
      </Typography>

      {subtitle && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          {subtitle}
        </Typography>
      )}

      <Box>{children}</Box>
    </Paper>
  );
};

export default DashboardSection;