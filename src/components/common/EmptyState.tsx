import { ReactNode } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: ReactNode;
}

export default function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon,
}: EmptyStateProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 6,
        borderRadius: 4,
        border: "1px dashed",
        borderColor: "divider",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "center",
          color: "text.secondary",
        }}
      >
        {icon ?? <InboxOutlinedIcon sx={{ fontSize: 64 }} />}
      </Box>

      <Typography variant="h5" fontWeight={700} gutterBottom>
        {title}
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: actionLabel ? 3 : 0 }}
      >
        {description}
      </Typography>

      {actionLabel && onAction && (
        <Button
          variant="contained"
          size="large"
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </Paper>
  );
}