import {
  Box,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

interface Props {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export default function ScheduleSection({
  title,
  subtitle,
  icon,
  children,
}: Props) {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        mb: 3,
        overflow: "hidden",
        borderRadius: 4,
        border: 1,
        borderColor: "divider",
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 2.5,
          bgcolor: alpha(theme.palette.text.primary, 0.04),
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
        >
          {icon}

          <Box>
            <Typography
              variant="overline"
              sx={{
                display: "block",
                fontWeight: 700,
                letterSpacing: 2,
                color: "text.primary",
              }}
            >
              {title.toUpperCase()}
            </Typography>

            {subtitle && (
              <Typography
                variant="body2"
                color="text.secondary"
              >
                {subtitle}
              </Typography>
            )}
          </Box>
        </Stack>
      </Box>

      <Stack
        spacing={1.5}
        sx={{
          p: 2,
        }}
      >
        {children}
      </Stack>
    </Paper>
  );
}