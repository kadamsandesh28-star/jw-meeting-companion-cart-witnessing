import {
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function MeetingSectionCard({
  title,
  children,
}: Props) {
  return (
    <Card
      elevation={3}
      sx={{
        mb: 4,
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ mb: 2 }}
        >
          {title}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {children}
      </CardContent>
    </Card>
  );
}