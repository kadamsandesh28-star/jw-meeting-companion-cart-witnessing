import { ReactNode } from "react";
import {
  Box,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import AppCard from "./AppCard";

export interface SectionCardProps {
  /** Section title */
  title: string;

  /** Optional subtitle */
  subtitle?: string;

  /** Optional icon */
  icon?: ReactNode;

  /** Optional actions */
  actions?: ReactNode;

  /** Section content */
  children: ReactNode;

  /** Optional footer */
  footer?: ReactNode;
}

export default function SectionCard({
  title,
  subtitle,
  icon,
  actions,
  children,
  footer,
}: SectionCardProps) {
  return (
    <AppCard
      disablePadding
      hover={false}
    >
      <Box p={3}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
          >
            {icon && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "primary.main",
                }}
              >
                {icon}
              </Box>
            )}

            <Box>
              <Typography
                variant="h6"
                fontWeight={700}
              >
                {title}
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

          {actions}
        </Stack>
      </Box>

      <Divider />

      <Box p={3}>
        {children}
      </Box>

      {footer && (
        <>
          <Divider />

          <Box p={2}>
            {footer}
          </Box>
        </>
      )}
    </AppCard>
  );
}