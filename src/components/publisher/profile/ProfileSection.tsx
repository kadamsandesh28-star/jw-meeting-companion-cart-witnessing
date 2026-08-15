import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";

interface ProfileSectionProps {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}

export default function ProfileSection({
  title,
  children,
  actions,
}: ProfileSectionProps) {
  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
        height: "100%",
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="h6"
            fontWeight={700}
          >
            {title}
          </Typography>

          {actions && (
            <Box>
              {actions}
            </Box>
          )}
        </Stack>

        <Divider sx={{ my: 2 }} />

        {children}
      </CardContent>
    </Card>
  );
}