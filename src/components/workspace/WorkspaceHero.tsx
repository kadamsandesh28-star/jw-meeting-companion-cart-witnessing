import { ReactNode } from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

interface WorkspaceHeroProps {
  title: string;
  subtitle: string;
  actionLabel?: string;
  actionTo?: string;
  icon?: ReactNode;
}

export default function WorkspaceHero({
  title,
  subtitle,
  actionLabel,
  actionTo,
  icon,
}: WorkspaceHeroProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 4,
        background:
          "linear-gradient(135deg, #1565c0 0%, #42a5f5 100%)",
        color: "white",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={3}
      >
        <Box>
          {icon}

          <Typography
            variant="h4"
            fontWeight={700}
            gutterBottom
          >
            {title}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              opacity: 0.9,
              maxWidth: 650,
            }}
          >
            {subtitle}
          </Typography>
        </Box>

        {actionLabel && actionTo && (
          <Button
            component={RouterLink}
            to={actionTo}
            variant="contained"
            color="inherit"
            sx={{
              color: "primary.main",
              fontWeight: 700,
              borderRadius: 3,
              px: 3,
            }}
          >
            {actionLabel}
          </Button>
        )}
      </Stack>
    </Paper>
  );
}