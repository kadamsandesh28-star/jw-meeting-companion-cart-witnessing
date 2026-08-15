import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";

interface PageContainerProps extends BoxProps {
  children: ReactNode;
}

export default function PageContainer({
  children,
  sx,
  ...props
}: PageContainerProps) {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1600,
        mx: "auto",
        px: {
          xs: 2,
          sm: 3,
          md: 4,
        },
        py: {
          xs: 2,
          sm: 3,
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}