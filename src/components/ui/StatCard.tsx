import { ReactNode } from "react";
import { Box, Stack, Typography } from "@mui/material";
import AppCard from "./AppCard";

export interface StatCardProps {
  /** Main value displayed prominently */
  value: string | number;

  /** Label displayed below the value */
  label: string;

  /** Optional icon */
  icon?: ReactNode;

  /** Optional description */
  description?: string;

  /** Optional color for the value */
  color?: string;

  /** Optional click handler */
  onClick?: () => void;
}

export default function StatCard({
  value,
  label,
  icon,
  description,
  color = "primary.main",
  onClick,
}: StatCardProps) {
  return (
    <AppCard
      hover
    >
      <Box
        onClick={onClick}
        sx={{
          cursor: onClick ? "pointer" : "default",
        }}
      >
        <Stack spacing={2}>
          {icon && (
            <Box
              sx={{
                color: color,
                display: "flex",
                alignItems: "center",
                fontSize: 36,
              }}
            >
              {icon}
            </Box>
          )}

          <Typography
            variant="h3"
            fontWeight={700}
            color={color}
          >
            {value}
          </Typography>

          <Typography
            variant="subtitle1"
            fontWeight={600}
          >
            {label}
          </Typography>

          {description && (
            <Typography
              variant="body2"
              color="text.secondary"
            >
              {description}
            </Typography>
          )}
        </Stack>
      </Box>
    </AppCard>
  );
}