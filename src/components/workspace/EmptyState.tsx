import { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonLabel?: string;
  buttonTo?: string;
  icon?: ReactNode;
}

export default function EmptyState({
  title,
  description,
  buttonLabel,
  buttonTo,
  icon,
}: EmptyStateProps) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px dashed",
        borderColor: "divider",
      }}
    >
      <CardContent sx={{ py: 8 }}>
        <Stack
          spacing={3}
          alignItems="center"
          textAlign="center"
        >
          <Avatar
            sx={{
              width: 72,
              height: 72,
              bgcolor: "primary.main",
            }}
          >
            {icon}
          </Avatar>

          <Box>
            <Typography
              variant="h5"
              fontWeight={700}
            >
              {title}
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              {description}
            </Typography>
          </Box>

          {buttonLabel && buttonTo && (
            <Button
              component={RouterLink}
              to={buttonTo}
              variant="contained"
            >
              {buttonLabel}
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}