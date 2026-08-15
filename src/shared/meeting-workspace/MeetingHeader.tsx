import {
  Box,
  Stack,
  Typography,
} from "@mui/material";

interface Props {
  title: string;
  subtitle?: string;
  description?: string;
  actions?: React.ReactNode;
}

export default function MeetingHeader({
  title,
  subtitle,
  description,
  actions,
}: Props) {
  const text = subtitle ?? description;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 3,
        flexWrap: "wrap",
      }}
    >
      <Stack spacing={1}>
        <Typography
          variant="h4"
          fontWeight={700}
        >
          {title}
        </Typography>

        {text && (
          <Typography
            color="text.secondary"
            sx={{
              maxWidth: 700,
            }}
          >
            {text}
          </Typography>
        )}
      </Stack>

      {actions}
    </Box>
  );
}