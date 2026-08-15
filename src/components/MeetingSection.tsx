import {
  Box,
  Typography,
  Divider,
} from "@mui/material";

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function MeetingSection({
  title,
  children,
}: Props) {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{ mb: 2 }}
      >
        {title}
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {children}
    </Box>
  );
}