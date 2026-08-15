import { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AppCard from "./AppCard";

export interface ActionCardProps {
  /** Card title */
  title: string;

  /** Optional description */
  description?: string;

  /** Optional icon */
  icon?: ReactNode;

  /** Navigate to route */
  to?: string;

  /** Click handler */
  onClick?: () => void;

  /** Optional custom action */
  action?: ReactNode;

  /** Optional extra content */
  children?: ReactNode;
}

export default function ActionCard({
  title,
  description,
  icon,
  to,
  onClick,
  action,
  children,
}: ActionCardProps) {
  const content = (
    <AppCard hover>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
      >
        {icon && (
          <Box
            sx={{
              color: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
            }}
          >
            {icon}
          </Box>
        )}

        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h6"
            fontWeight={600}
          >
            {title}
          </Typography>

          {description && (
            <Typography
              variant="body2"
              color="text.secondary"
            >
              {description}
            </Typography>
          )}

          {children}
        </Box>

        {action ?? (
          <IconButton
            size="small"
            disableRipple
          >
            <ChevronRightIcon />
          </IconButton>
        )}
      </Stack>
    </AppCard>
  );

  if (to) {
    return (
      <Box
        component={RouterLink}
        to={to}
        sx={{
          textDecoration: "none",
          color: "inherit",
          display: "block",
        }}
      >
        {content}
      </Box>
    );
  }

  return (
    <Box
      onClick={onClick}
      sx={{
        cursor: onClick ? "pointer" : "default",
      }}
    >
      {content}
    </Box>
  );
}