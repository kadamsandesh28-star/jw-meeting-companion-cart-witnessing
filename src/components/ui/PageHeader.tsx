import { ReactNode } from "react";
import {
  Box,
  Breadcrumbs,
  Stack,
  Typography,
} from "@mui/material";

export interface PageHeaderProps {
  /** Main page title */
  title: string;

  /** Optional subtitle */
  subtitle?: string;

  /** Backward-compatible alias */
  description?: string;

  /** Optional icon */
  icon?: ReactNode;

  /** Optional breadcrumb navigation */
  breadcrumbs?: ReactNode;

  /** Optional actions (buttons, menus, etc.) */
  actions?: ReactNode;
}

export default function PageHeader({
  title,
  subtitle,
  description,
  icon,
  breadcrumbs,
  actions,
}: PageHeaderProps) {
  const text = subtitle ?? description;

  return (
    <Box sx={{ mb: 4 }}>
      {breadcrumbs && (
        <Breadcrumbs sx={{ mb: 2 }}>
          {breadcrumbs}
        </Breadcrumbs>
      )}

      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={3}
      >
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
                fontSize: 40,
              }}
            >
              {icon}
            </Box>
          )}

          <Box>
            <Typography
              variant="h4"
              fontWeight={700}
            >
              {title}
            </Typography>

            {text && (
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                {text}
              </Typography>
            )}
          </Box>
        </Stack>

        {actions && <Box>{actions}</Box>}
      </Stack>
    </Box>
  );
}