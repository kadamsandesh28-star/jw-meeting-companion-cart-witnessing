import { ReactNode } from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

export interface AppCardProps {
  /** Main title displayed in the card header */
  title?: string;

  /** Optional subtitle displayed below the title */
  subtitle?: string;

  /** Optional icon displayed to the left of the title */
  icon?: ReactNode;

  /** Optional actions displayed on the right side of the header */
  actions?: ReactNode;

  /** Main card content */
  children: ReactNode;

  /** Optional footer */
  footer?: ReactNode;

  /** Remove default padding */
  disablePadding?: boolean;

  /** Hover elevation effect */
  hover?: boolean;

  /** Height */
  height?: number | string;

  /** Width */
  width?: number | string;
}

export default function AppCard({
  title,
  subtitle,
  icon,
  actions,
  children,
  footer,
  disablePadding = false,
  hover = true,
  height = "100%",
  width = "100%",
}: AppCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        width,
        height,
        borderRadius: 4,
        border: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
        transition: "all .25s ease",

        ...(hover && {
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: (theme) => theme.shadows[8],
          },
        }),
      }}
    >
      {(title || subtitle || icon || actions) && (
        <>
          <Box px={3} pt={3} pb={2}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              spacing={2}
            >
              <Stack
                direction="row"
                spacing={2}
                alignItems="flex-start"
              >
                {icon && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mt: 0.25,
                      color: "primary.main",
                    }}
                  >
                    {icon}
                  </Box>
                )}

                <Box>
                  {title && (
                    <Typography
                      variant="h6"
                      fontWeight={700}
                    >
                      {title}
                    </Typography>
                  )}

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

              {actions && <Box>{actions}</Box>}
            </Stack>
          </Box>

          <Divider />
        </>
      )}

      <CardContent
        sx={{
          p: disablePadding ? 0 : 3,
          "&:last-child": {
            pb: disablePadding ? 0 : 3,
          },
        }}
      >
        {children}
      </CardContent>

      {footer && (
        <>
          <Divider />

          <Box p={2}>
            {footer}
          </Box>
        </>
      )}
    </Card>
  );
}