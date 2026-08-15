import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  showBackButton?: boolean;
}

export default function PageHeader({
  title,
  subtitle,
  actions,
  showBackButton = true,
}: Props) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 2,
        mb: 3,
        flexWrap: "wrap",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 1,
          flex: 1,
        }}
      >
        {showBackButton && (
          <IconButton
            onClick={() => navigate(-1)}
            sx={{ mt: 0.25 }}
          >
            <ArrowBack />
          </IconButton>
        )}

        <Stack spacing={0.5}>
          <Typography
            variant="h4"
            fontWeight="bold"
          >
            {title}
          </Typography>

          {subtitle && (
            <Typography
              variant="body1"
              color="text.secondary"
            >
              {subtitle}
            </Typography>
          )}
        </Stack>
      </Box>

      {actions && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {actions}
        </Box>
      )}
    </Box>
  );
}