import { ReactNode } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";

export interface EmptyStateProps {
  /** Main title */
  title: string;

  /** Optional description */
  description?: string;

  /** Optional icon */
  icon?: ReactNode;

  /** Optional action button text */
  actionLabel?: string;

  /** Optional click handler */
  onAction?: () => void;
}

export default function EmptyState({
  title,
  description,
  icon,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <Box
      sx={{
        py: 8,
        px: 4,
        textAlign: "center",
      }}
    >
      <Stack
        spacing={3}
        alignItems="center"
      >
        {icon && (
          <Box
            sx={{
              color: "text.secondary",
              fontSize: 72,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {icon}
          </Box>
        )}

        <Typography
          variant="h5"
          fontWeight={700}
        >
          {title}
        </Typography>

        {description && (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              maxWidth: 500,
            }}
          >
            {description}
          </Typography>
        )}

        {actionLabel && onAction && (
          <Button
            variant="contained"
            onClick={onAction}
          >
            {actionLabel}
          </Button>
        )}
      </Stack>
    </Box>
  );
}