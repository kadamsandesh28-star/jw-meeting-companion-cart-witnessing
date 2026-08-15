import {
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

interface MeetingCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function MeetingCard({
  title,
  subtitle,
  children,
}: MeetingCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        transition: "all .25s ease",

        "&:hover": {
          boxShadow: 3,
        },
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Stack spacing={3}>

          <Stack spacing={1}>
            <Typography
              variant="h5"
              fontWeight={700}
            >
              {title}
            </Typography>

            {subtitle && (
              <Typography
                color="text.secondary"
              >
                {subtitle}
              </Typography>
            )}
          </Stack>

          <Divider />

          {children}

        </Stack>
      </CardContent>
    </Card>
  );
}