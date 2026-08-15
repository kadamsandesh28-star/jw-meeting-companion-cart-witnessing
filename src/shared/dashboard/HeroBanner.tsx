import {
  Box,
  Stack,
  Typography,
} from "@mui/material";

import { loadCongregationProfile } from "../../features/settings/storage/congregationProfileStorage";

interface Props {
  title: string;
  subtitle?: string;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
}

export default function HeroBanner({
  title,
  subtitle,
  primaryAction,
  secondaryAction,
}: Props) {
  const profile = loadCongregationProfile();

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 6,
        px: 6,
        py: 7,
        color: "white",
        background:
          "linear-gradient(135deg,#2F4858 0%,#4A6572 100%)",
        boxShadow:
          "0 24px 60px rgba(47,72,88,.22)",
      }}
    >
      {/* Decorative Circle */}
      <Box
        sx={{
          position: "absolute",
          width: 260,
          height: 260,
          borderRadius: "50%",
          bgcolor: "rgba(255,255,255,.03)",
          top: -120,
          right: -60,
        }}
      />

      {/* Decorative Circle */}
      <Box
        sx={{
          position: "absolute",
          width: 180,
          height: 180,
          borderRadius: "50%",
          bgcolor: "rgba(255,255,255,.02)",
          bottom: -80,
          left: -40,
        }}
      />

      <Stack
        spacing={3}
        alignItems="center"
        textAlign="center"
        sx={{
          position: "relative",
        }}
      >
        <Typography
          sx={{
            fontSize: 13,
            letterSpacing: ".35em",
            fontWeight: 600,
            opacity: 0.75,
            textTransform: "uppercase",
          }}
        >
          {profile.congregationName.toUpperCase()}
        </Typography>

        <Typography
          variant="h2"
          sx={{
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            fontStyle: "italic",
            fontSize: 20,
            opacity: 0.92,
            maxWidth: 760,
            lineHeight: 1.7,
          }}
        >
          “{profile.scriptureText}”

          <Box
            component="span"
            sx={{
              display: "block",
              mt: 1,
              fontStyle: "normal",
              fontWeight: 600,
              fontSize: 16,
              opacity: 0.8,
            }}
          >
            — {profile.scriptureReference}
          </Box>
        </Typography>

        {subtitle && (
          <Typography
            sx={{
              opacity: 0.78,
              maxWidth: 760,
              fontSize: 17,
            }}
          >
            {subtitle}
          </Typography>
        )}

        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{
            mt: 1,
          }}
        >
          {primaryAction}
          {secondaryAction}
        </Stack>
      </Stack>
    </Box>
  );
}