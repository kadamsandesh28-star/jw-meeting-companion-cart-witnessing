import { ReactNode } from "react";

import {
  Box,
  Stack,
  Typography,
  TypographyProps,
} from "@mui/material";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  titleProps?: TypographyProps;
}

export default function PageHeader({
  title,
  subtitle,
  action,
  titleProps,
}: PageHeaderProps) {
  return (
    <Stack
      direction={{
        xs: "column",
        md: "row",
      }}
      justifyContent="space-between"
      alignItems={{
        xs: "stretch",
        md: "center",
      }}
      spacing={2}
      mb={3}
    >
      <Box>
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{
            fontSize: {
              xs: "1.8rem",
              sm: "2.125rem",
            },
          }}
          {...titleProps}
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography
            variant="body1"
            color="text.secondary"
            mt={0.5}
          >
            {subtitle}
          </Typography>
        )}
      </Box>

      {action && (
        <Box
          sx={{
            width: {
              xs: "100%",
              md: "auto",
            },
            "& .MuiButton-root": {
              width: {
                xs: "100%",
                md: "auto",
              },
              minHeight: 44,
              borderRadius: 2,
            },
          }}
        >
          {action}
        </Box>
      )}
    </Stack>
  );
}